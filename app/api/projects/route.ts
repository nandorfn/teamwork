import prisma from "@lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { ZodIssue } from "zod";

export const GET = async () => {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects, { status: 200 })
}