"use client"
import React from "react"

export default function AdminPage (){
    const upload = async (e:any )=>{
        const file = e.target.files[0];



        const form =new FormData();
        form.append(file,file);


        await fetch("api/template",{
            method: "POST",
            body: form,
        });

        alert("Uploaded");
    };

    return (
        <div className="">
            <input type="file" accept="application/pdf" onChange={upload}/>
        </div>
    )
}