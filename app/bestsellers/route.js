import { NextResponse } from 'next/server';
import data from '../../data/bestsellers.csv';

export async function GET() {
    return NextResponse.json(data);
}
