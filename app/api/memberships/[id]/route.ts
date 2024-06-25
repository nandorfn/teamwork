import { verifyCookie } from "@auth";
import { addNewMember } from "@db/memberships";
import { getUserIdByEmail } from "@db/users";
import { resKey, responseError, responseOK } from "@http";
import { TMemberSchema, memberSchema } from "@schemas/memberSchemas";
import { ZodIssue } from "zod";

export const POST = async (req: Request, { params }: { params : { id:string}}) => {
  const verifiedToken = await verifyCookie(req);
  if (!verifiedToken) return responseError(401, resKey.denied);

  const body: TMemberSchema = await req.json();
  if (!body) return responseError(400);

  const result = memberSchema.safeParse(body);
  if (!result.success) {
    let zodErrors = {};
    result.error.issues.forEach((issue: ZodIssue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: issue.message
      };
    });

    return responseError(400);
  }
  
  const user = await getUserIdByEmail(result.data.email);
  if (!user) return responseError(400);

  try {
    const res = await addNewMember(user.id, Number(params.id));
    return responseOK(res, 201, resKey.success);
  } catch (error) {
    return responseError(500);
  }
};