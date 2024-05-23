import { verifyCookie } from '@auth';
import { NextResponse } from 'next/server';
import { getIssueByProjectId } from '../../../db/issues';

export const GET = async (req: Request, { params }: {params: {
  id: number
}}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }
  return getIssueByProjectId(params?.id)
}