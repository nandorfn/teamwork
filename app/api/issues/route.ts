import { verifyCookie } from '@auth';
import { TIssueForm } from '@schemas/issueSchemas';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const verifiedToken = await verifyCookie(req);

  if (!verifiedToken) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }

  const body: TIssueForm = await req.json();
  if (!body) {
    return NextResponse.json({ errors: 'Bad Request' }, { status: 400 });
  }
  
  console.log(body);
}