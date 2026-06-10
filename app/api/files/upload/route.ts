import { NextResponse, NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ ok: true, filename, size: buffer.length });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}


// import { NextResponse, NextRequest } from "next/server";
// import fs from "fs";
// import path from "path";
// import { pipeline } from "stream/promises";

// export const runtime = "nodejs";

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json(
//         { error: "No file provided" },
//         { status: 400 }
//       );
//     }

//     const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

//     const uploadsDir = path.join(
//       process.cwd(),
//       "public",
//       "uploads"
//     );

//     await fs.promises.mkdir(uploadsDir, { recursive: true });

//     const filePath = path.join(uploadsDir, filename);

//     // Web stream from browser file
//     const webStream = file.stream();

//     // Convert to Node writable stream
//     const writableStream = fs.createWriteStream(filePath);

//     /**
//      * 🔐 ENCRYPTION PLACEHOLDER (for later)
//      * ------------------------------------
//      * const encryptionStream = createCipheriv(...)
//      * webStream.pipeTo(encryptionStream).pipeTo(writableStream)
//      */

//     // Simple direct streaming (NO encryption yet)
//     await pipeline(webStream as any, writableStream);

//     return NextResponse.json({
//       ok: true,
//       filename,
//       size: file.size,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err?.message || String(err) },
//       { status: 500 }
//     );
//   }
// }
