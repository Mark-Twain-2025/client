import "@/components/sb2-bootstrap/sb-admin-2.min.css";
import SBCard from "@/components/sb2-bootstrap/sbCard";
import {
  CircleButton,
  SplitButton,
  BrandButton,
} from "@/components/sb2-bootstrap/sbButton";
export default function BSExamplePage() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">버튼 예제 페이지</h1>

      <SBCard title="Circle Buttons">
        <div className="d-flex gap-2">
          <CircleButton icon="fab fa-facebook-f" color="primary" />
          <CircleButton icon="fas fa-check" color="success" size="lg" />
        </div>
      </SBCard>

      <div className="my-4" />

      <SBCard title="Brand Buttons">
        <BrandButton brand="google" />
        <BrandButton brand="facebook" />
      </SBCard>

      <div className="my-4" />

      <SBCard title="Split Buttons">
        <SplitButton
          icon="fas fa-flag"
          text="Split Button Primary"
          color="primary"
        />
        <SplitButton
          icon="fas fa-check"
          text="Split Button Success"
          color="success"
          size="sm"
        />
      </SBCard>
    </div>
  );
}
