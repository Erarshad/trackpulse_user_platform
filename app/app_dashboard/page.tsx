'use client'
import { useParams } from 'next/navigation';
import React from 'react'
import { decodeHash } from '../utils/hashed_path';
import { AppData } from '../app_canvas/type';

export default function DashBoard({
    searchParams
}: {
    searchParams: {
        appData: AppData
    }
}) {
    console.log("data is  " + searchParams.appData);
    return (
        <div>DashBoard</div>
    );
}

