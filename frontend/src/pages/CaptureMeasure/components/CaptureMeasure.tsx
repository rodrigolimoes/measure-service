import { FC, useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import { useCreateMeasure } from "@/hooks/useCreateMeasure";
import { useMeasureContext } from "../Context";
import { useParams } from "react-router-dom";

interface CaptureMeasureStateProps {}
interface CaptureMeasureDispatchProps {
  onNext: () => void;
}

type CaptureMeasureProps = CaptureMeasureStateProps &
  CaptureMeasureDispatchProps;

export const CaptureMeasure: FC<CaptureMeasureProps> = ({ onNext }) => {
  const { id } = useParams()
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [createMeasure] = useCreateMeasure()
  const {onSetMeasure, measureType} = useMeasureContext()

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
      }
    };

    openCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        
        const imageData = canvas.toDataURL("image/png");
        const base64Data = imageData.split(",")[1];
        const data = await createMeasure({
          image: base64Data,
          measure_type: measureType || "WATER",
          measure_datetime: new Date().toISOString(),
          customer_code: id || "",
        });

        onSetMeasure({
          imageUrl: data?.image_url,
          measureValue: data?.measure_value,
          measureUuid: data?.measure_uuid
        })
        onNext();
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h2>Câmera do Celular</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: "300px" }} />

      <Button onClick={takePhoto}>Tirar Foto</Button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};
