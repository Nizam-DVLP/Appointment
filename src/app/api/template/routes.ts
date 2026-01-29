import fs from "fs"
import { NextResponse } from "next/server";
import path from "path"

export async function POST(req: Request){

     const data =await req.formData();
     const file =data.get("file") as File;

     const bytes = await file.arrayBuffer();
     const buffer =Buffer.from(bytes);


     const filePath =path.join(
        process.cwd(),
        "public/templates/Mock appointment letter.docx .docx.pdf"
     );

     fs.writeFileSync(filePath,buffer);

     return NextResponse.json({success: true})
    }