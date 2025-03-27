import { prismaClient } from "../../prisma";

class GetUnfollowedUsersService {
  async execute(loggedUserId: string) {
    const followingUsers = await prismaClient.follower.findMany({
      where: { followerId: loggedUserId },
      select: { followedId: true },
    });

    const followersUsers = await prismaClient.follower.findMany({
      where: { followedId: loggedUserId },
      select: { followerId: true },
    });

    const followingIds = followingUsers.map((user) => user.followedId);
    const followersIds = followersUsers.map((user) => user.followerId);

    const allFollowedIds = Array.from(
      new Set([...followingIds, ...followersIds])
    );

    const unfollowedUsers = await prismaClient.user.findMany({
      where: {
        id: {
          notIn: [...allFollowedIds, loggedUserId],
        },
      },
      select: {
        id: true,
        name: true,
        profilePicture: true,
      },
    });

    return unfollowedUsers;
  }
}

export { GetUnfollowedUsersService };
