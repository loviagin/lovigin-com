import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderID } = body;

  const response = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64")}`,
    },
  });

  const data = await response.json();

  // Проверить статус заказа
  if (data.status === "COMPLETED") {
    // Обработка: запись в БД, отправка письма и т.д.
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
}