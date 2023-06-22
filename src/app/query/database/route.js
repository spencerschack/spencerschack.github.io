import { NextResponse } from "next/server";
import generate from "./generate";

export async function GET() {
  return new NextResponse((await generate()).export());
}
