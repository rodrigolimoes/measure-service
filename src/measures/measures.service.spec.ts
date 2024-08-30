import { MeasuresService } from '@src/measures/measures.service';
import { Equal, ILike, Repository } from 'typeorm';
import { Measure } from '@src/measures/entity/measure.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { GenerativeModel } from '@google/generative-ai';
import { TypesEnum } from './enum/types.enum';
import { HttpException } from '@src/common/utils/httpException';
import { StatusCodes } from '@src/common/enums/statusCodes';

const measure = {
	id: '25b2f72c-1450-4db4-986e-30ea5fc27395',
	image_url: 'http://localhost:80/img/307475f3a43b9f3fed98d10b02b0bc76.png',
	measure_value: 4500,
	has_confirmed: false,
	type: TypesEnum.WATER,
	customer_code: '12345',
	measure_date: '2024-07-28T12:00:00.000Z'
};

describe('Measure service', () => {
	const mockRepository = {
		find: jest.fn(),
		create: jest.fn(),
		save: jest.fn(),
		findOne: jest.fn()
	};
	const mockGeminiModel = {
		generateContent: jest.fn()
	};
	const mockFileUtils = {
		save: jest.fn()
	};
	const service = new MeasuresService(
		mockRepository as unknown as Repository<Measure>,
		mockGeminiModel as unknown as GenerativeModel,
		mockFileUtils
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('findOne', () => {
		it('should return a measure by id', async () => {
			jest
				.spyOn(mockRepository, 'findOne')
				.mockReturnValue(Promise.resolve(measure));

			const response = await service.findOne(measure.id);

			expect(response).toBeDefined();
			expect(mockRepository.findOne).toHaveBeenCalled();
			expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
			expect(mockRepository.findOne).toHaveBeenCalledWith({
				where: { id: measure.id }
			});
			expect(response).toEqual(response);
		});

		it('should return an error message if the measure is not found', async () => {
			jest
				.spyOn(mockRepository, 'findOne')
				.mockReturnValue(Promise.resolve(null));

			const id = '12345';
			await expect(service.findOne(id)).rejects.toThrow(
				new HttpException({
					statusCode: StatusCodes.NOT_FOUND,
					message: 'Leitura do mês já realizada',
					errorCode: 'MEASURE_NOT_FOUND'
				})
			);

			expect(mockRepository.findOne).toHaveBeenCalled();
			expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
			expect(mockRepository.findOne).toHaveBeenCalledWith({
				where: { id }
			});
		});
	});

	describe('find', () => {
		it('should return a list of measures', async () => {
			jest
				.spyOn(mockRepository, 'find')
				.mockReturnValue(Promise.resolve([measure]));

			const response = await service.find({});

			expect(response).toBeDefined();
			expect(mockRepository.find).toHaveBeenCalled();
			expect(mockRepository.find).toHaveBeenCalledTimes(1);
			expect(mockRepository.find).toHaveBeenCalledWith({
				where: {}
			});
			expect(response).toEqual(response);
		});

		it('should return a list of measures by type', async () => {
			jest
				.spyOn(mockRepository, 'find')
				.mockReturnValue(Promise.resolve([measure]));

			const response = await service.find({ measure_type: TypesEnum.WATER });

			expect(response).toBeDefined();
			expect(mockRepository.find).toHaveBeenCalled();
			expect(mockRepository.find).toHaveBeenCalledTimes(1);
			expect(mockRepository.find).toHaveBeenCalledWith({
				where: {
					type: ILike(TypesEnum.WATER)
				}
			});
			expect(response).toEqual(response);
		});

		it('should return a list of measures by customer code', async () => {
			jest
				.spyOn(mockRepository, 'find')
				.mockReturnValue(Promise.resolve([measure]));

			const response = await service.find({
				customer_code: measure.customer_code
			});

			expect(response).toBeDefined();
			expect(mockRepository.find).toHaveBeenCalled();
			expect(mockRepository.find).toHaveBeenCalledTimes(1);
			expect(mockRepository.find).toHaveBeenCalledWith({
				where: {
					customer_code: Equal(measure.customer_code)
				}
			});
			expect(response).toEqual(response);
		});
	});
});
