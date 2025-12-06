import { Metadata } from "next";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
    title: "Live Demo",
    description: "Bản đồ hành chính Việt Nam 34 tỉnh thành tương tác trực tiếp. Xem chi tiết số liệu và cấu trúc đơn vị hành chính mới.",
};

export default function DemoPage() {
    return <DemoClient />;
}
