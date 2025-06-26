import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import Image from "next/image";

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  imageSrc?: string;
  imageAlt?: string;
  title: React.ReactNode;
  message: React.ReactNode;
  buttonText: string;
  onButtonClick?: () => void;
}

const CardModal: React.FC<CardModalProps> = ({
  open,
  onClose,
  imageSrc,
  imageAlt,
  title,
  message,
  buttonText,
  onButtonClick,
}) => {
  if (!open) return null;
  return (
    <div className="card-modal-overlay">
      <div className="card-modal-card">
        {imageSrc && (
          <div className="card-modal-img-wrapper">
            <Image
              src={imageSrc}
              alt={imageAlt || "modal-img"}
              className="card-modal-img"
              width={56}
              height={56}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        )}
        <Card className="pt-12 pb-8 px-6 relative text-center rounded-2xl shadow-lg">
          <div
            className="card-modal-title"
            style={{
              color: "#FFA500",
              fontWeight: 700,
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            {title}
          </div>
          <div
            className="card-modal-message"
            style={{
              marginBottom: "2rem",
              color: "#333",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            {message}
          </div>
          <Button
            className="card-modal-btn !bg-[#FFA500] !text-white"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              borderRadius: "8px",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(255,165,0,0.08)",
              border: "none",
              minHeight: "40px",
              lineHeight: 1.2,
            }}
            onClick={() => {
              onButtonClick?.();
              onClose();
            }}
          >
            {buttonText}
          </Button>
        </Card>
      </div>
      <style jsx>{`
        .card-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .card-modal-card {
          position: relative;
          max-width: 350px;
          width: 100%;
        }
        .card-modal-img-wrapper {
          position: absolute;
          left: 50%;
          top: -38px;
          transform: translateX(-50%);
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .card-modal-img {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
};

export default CardModal;