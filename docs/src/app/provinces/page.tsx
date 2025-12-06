import { Metadata } from "next";
import ProvincesClient from "./ProvincesClient";

export const metadata: Metadata = {
    title: "Tra cứu 34 Tỉnh Thành",
    description: "Danh sách chi tiết 34 tỉnh thành và 3,321 xã phường mới theo Nghị quyết 19/2025/QĐ-TTg.",
};

export default function ProvincesPage() {
    return <ProvincesClient />;
}
