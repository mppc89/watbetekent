import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    revalidatePath("/sitemap.xml");
    console.log(`[Revalidate] Triggered at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      message: "Sitemap revalidated",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Revalidation failed",
      },
      { status: 500 }
    );
  }
}
