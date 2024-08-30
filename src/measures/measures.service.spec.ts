import { MeasuresService } from "@src/measures/measures.service";
import { Equal, ILike, Repository } from "typeorm";
import { Measure } from "@src/measures/entity/measure.entity";
import { GenerativeModel } from "@google/generative-ai";
import { TypesEnum } from "./enum/types.enum";
import { HttpException } from "@src/common/utils/httpException";
import { StatusCodes } from "@src/common/enums/statusCodes";
import * as fs from "fs";

jest.mock("fs");
jest.mock("Buffer");

const measure = {
  id: "25b2f72c-1450-4db4-986e-30ea5fc27395",
  image_url: "http://localhost:80/img/307475f3a43b9f3fed98d10b02b0bc76.png",
  measure_value: 4500,
  has_confirmed: false,
  type: TypesEnum.WATER,
  customer_code: "12345",
  measure_date: "2024-07-28T12:00:00.000Z",
};

describe("Measure service", () => {
  const mockRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };
  const mockGeminiModel = {
    generateContent: jest.fn(),
  };
  const mockFileUtils = {
    save: jest.fn(),
  };
  const service = new MeasuresService(
    mockRepository as unknown as Repository<Measure>,
    mockGeminiModel as unknown as GenerativeModel,
    mockFileUtils
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findOne", () => {
    it("should return a measure by id", async () => {
      jest
        .spyOn(mockRepository, "findOne")
        .mockReturnValue(Promise.resolve(measure));

      const response = await service.findOne(measure.id);

      expect(response).toBeDefined();
      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: measure.id },
      });
      expect(response).toEqual(response);
    });

    it("should return an error message if the measure is not found", async () => {
      jest
        .spyOn(mockRepository, "findOne")
        .mockReturnValue(Promise.resolve(null));

      const id = "12345";
      await expect(service.findOne(id)).rejects.toThrow(
        new HttpException({
          statusCode: StatusCodes.NOT_FOUND,
          message: "Leitura do mês já realizada",
          errorCode: "MEASURE_NOT_FOUND",
        })
      );

      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe("find", () => {
    it("should return a list of measures", async () => {
      jest
        .spyOn(mockRepository, "find")
        .mockReturnValue(Promise.resolve([measure]));

      const response = await service.find({});

      expect(response).toBeDefined();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {},
      });
      expect(response).toEqual(response);
    });

    it("should return a list of measures by type", async () => {
      jest
        .spyOn(mockRepository, "find")
        .mockReturnValue(Promise.resolve([measure]));

      const response = await service.find({ measure_type: TypesEnum.WATER });

      expect(response).toBeDefined();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          type: ILike(TypesEnum.WATER),
        },
      });
      expect(response).toEqual(response);
    });

    it("should return a list of measures by customer code", async () => {
      jest
        .spyOn(mockRepository, "find")
        .mockReturnValue(Promise.resolve([measure]));

      const response = await service.find({
        customer_code: measure.customer_code,
      });

      expect(response).toBeDefined();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          customer_code: Equal(measure.customer_code),
        },
      });
      expect(response).toEqual(response);
    });
  });

  describe("confirm", () => {
    const confirmDto = {
      confirmed_value: 49500,
      measure_uuid: "25b2f72c-1450-4db4-986e-30ea5fc27395",
    };
    const updatedMeasure = {
      ...measure,
      measure_value: confirmDto.confirmed_value,
      has_confirmed: true,
      measure_date: new Date(measure.measure_date),
    };

    it("should confirm the value of the measure", async () => {
      jest.spyOn(mockRepository, "save").mockImplementation();
      jest.spyOn(service, "findOne").mockReturnValue(
        Promise.resolve({
          ...measure,
          measure_date: new Date(measure.measure_date),
        })
      );
      jest
        .spyOn(mockRepository, "save")
        .mockReturnValue(Promise.resolve(updatedMeasure));

      const response = await service.confirm(confirmDto);

      expect(response).toBeDefined();
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(confirmDto.measure_uuid);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(updatedMeasure)
      );
      expect(response).toEqual(expect.objectContaining(updatedMeasure));
    });

    it("should return an error message if the measurement value has already been confirmed", async () => {
      jest.spyOn(mockRepository, "save").mockImplementation();
      jest.spyOn(service, "findOne").mockReturnValue(
        Promise.resolve({
          ...measure,
          measure_date: new Date(measure.measure_date),
          has_confirmed: true,
        })
      );

      await expect(service.confirm(confirmDto)).rejects.toThrow(
        new HttpException({
          statusCode: StatusCodes.CONFLICT,
          message: "Leitura do mês já realizada",
          errorCode: "CONFIRMATION_DUPLICATE",
        })
      );

      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(confirmDto.measure_uuid);
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe("analyze", () => {
    it("should return a measure value from the AI gemini analysis", async () => {
      const value = 54089;
      jest.spyOn(mockGeminiModel, "generateContent").mockReturnValue({
        response: {
          text: () => `meter value: ${value}`,
        },
      });
      jest.spyOn(fs, "readFileSync").mockReturnValue("ds");

      const response = await service.analyze("D:/user/documents");

      expect(response).toBeDefined();
      expect(mockGeminiModel.generateContent).toHaveBeenCalled();
      expect(mockGeminiModel.generateContent).toHaveBeenCalledTimes(1);
      expect(mockGeminiModel.generateContent).toHaveBeenCalledWith([
        {
          inlineData: {
            data: "ZHM=",
            mimeType: "image/png",
          },
        },
        {
          text: "Analyze this water/gas meter reading from the image and return the meter value in the following template without the unit of measure `meter value: ${value}`. Change “${value}” to the identified value",
        },
      ]);
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);

      expect(response).toEqual(value);
    });
  });

  describe("create", () => {
    const measureDto = {
      image: "ZHM=",
      customer_code: "98765",
      measure_datetime: "2024-07-28T12:00:00Z",
      measure_type: TypesEnum.WATER,
    };

    it("should create a new measure", async () => {
      const measureValue = 6789;
      const newMeasure = {
        type: measureDto.measure_type,
        image_url: `http://localhost:80/img/${measure.id}`,
        measure_date: new Date(measureDto.measure_datetime),
        customer_code: measureDto.customer_code,
        has_confirmed: false,
        measure_value: measureValue,
      };
      jest.spyOn(service, "find").mockReturnValue(Promise.resolve([]));
      jest.spyOn(mockFileUtils, "save").mockReturnValue(
        Promise.resolve({
          url: `http://localhost:80/img/${measure.id}`,
          path: "D:/user/documents",
        })
      );
      jest
        .spyOn(service, "analyze")
        .mockReturnValue(Promise.resolve(measureValue));
      jest
        .spyOn(mockRepository, "create")
        .mockImplementation((measure) => measure);
      jest
        .spyOn(mockRepository, "save")
        .mockImplementation((measure) => measure);

      const response = await service.create(measureDto);

      expect(response).toBeDefined();
      expect(service.find).toHaveBeenCalled();
      expect(service.find).toHaveBeenCalledTimes(1);
      expect(service.find).toHaveBeenCalledWith({
        measure_type: measureDto.measure_type,
        measure_date: measureDto.measure_datetime,
        customer_code: measureDto.customer_code,
      });

      expect(mockFileUtils.save).toHaveBeenCalled();
      expect(mockFileUtils.save).toHaveBeenCalledTimes(1);
      expect(mockFileUtils.save).toHaveBeenCalledWith(measureDto.image);

      expect(service.analyze).toHaveBeenCalled();
      expect(service.analyze).toHaveBeenCalledTimes(1);
      expect(service.analyze).toHaveBeenCalledWith("D:/user/documents");

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledWith(newMeasure);

      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledWith(newMeasure);

      expect(response).toEqual(newMeasure);
    });

    it("should return an error message if the water/gas measure already exists in the month", async () => {
      const measureValue = 6789;
      const newMeasure = {
        type: measureDto.measure_type,
        image_url: `http://localhost:80/img/${measure.id}`,
        measure_date: new Date(measureDto.measure_datetime),
        customer_code: measureDto.customer_code,
        has_confirmed: false,
        measure_value: measureValue,
      };
      jest.spyOn(service, "find").mockReturnValue(
        Promise.resolve([
          {
            ...measure,
            measure_date: new Date(measure.measure_date),
          },
        ])
      );
      jest.spyOn(mockFileUtils, "save").mockReturnValue(
        Promise.resolve({
          url: `http://localhost:80/img/${measure.id}`,
          path: "D:/user/documents",
        })
      );
      jest
        .spyOn(service, "analyze")
        .mockReturnValue(Promise.resolve(measureValue));
      jest
        .spyOn(mockRepository, "create")
        .mockImplementation((measure) => measure);
      jest
        .spyOn(mockRepository, "save")
        .mockImplementation((measure) => measure);

      await expect(service.create(measureDto)).rejects.toThrow(
        new HttpException({
          statusCode: StatusCodes.CONFLICT,
          message: "Leitura do mês já realizada",
          errorCode: "DOUBLE_REPORT",
        })
      );

      expect(service.find).toHaveBeenCalled();
      expect(service.find).toHaveBeenCalledTimes(1);
      expect(service.find).toHaveBeenCalledWith({
        measure_type: measureDto.measure_type,
        measure_date: measureDto.measure_datetime,
        customer_code: measureDto.customer_code,
      });

      expect(mockFileUtils.save).not.toHaveBeenCalled();
      expect(mockFileUtils.save).toHaveBeenCalledTimes(0);

      expect(service.analyze).not.toHaveBeenCalled();
      expect(service.analyze).toHaveBeenCalledTimes(0);

      expect(mockRepository.create).not.toHaveBeenCalled();
      expect(mockRepository.create).toHaveBeenCalledTimes(0);

      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });
  });
});
