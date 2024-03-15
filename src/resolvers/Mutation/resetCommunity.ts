import { USER_NOT_FOUND_ERROR } from "../../constants";
import { errors, requestContext } from "../../libraries";
import { Community, User } from "../../models";
import type { MutationResolvers } from "../../types/generatedGraphQLTypes";
import { superAdminCheck } from "../../utilities";

/**
 * This function enables to reset Pre login imagery.
 * @param _parent - parent of current request
 * @param args - payload provided with the request
 * @param context - context of entire application
 * @remarks The following checks are done:
 * 1. If the user exists.
 * 2. If the user is super admin.
 * @returns Boolean.
 */
export const resetCommunity: MutationResolvers["resetCommunity"] = async (
  _parent,
  args,
  context,
) => {
  const user = await User.findById(context.userId);
  if (!user)
    throw new errors.NotFoundError(
      requestContext.translate(USER_NOT_FOUND_ERROR.MESSAGE),
      USER_NOT_FOUND_ERROR.CODE,
      USER_NOT_FOUND_ERROR.PARAM,
    );

  superAdminCheck(user);

  await Community.deleteOne({ _id: args.id });

  return true;
};
