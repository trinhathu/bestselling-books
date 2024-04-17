import { NextResponse } from 'next/server';

import data from '../../data/bestsellers.json';
import { BookData } from '../../shared/types';

export function getData() {
    return data as BookData[];
}

export async function GET() {
    return NextResponse.json(getData());
}
