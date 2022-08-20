type APIResponse = {
  user: {
    userId: string
    friendList: {
      count: number
      friends: {
        firstName: string
        lastName: string
      }[]
    }[]
  }
}
type FriendList = APIResponse['user']['friendList']

function getAPIResponse(): Promise<APIResponse> {
  return new Promise((resolve, reject) => {})
}
// 键入 类型
function renderFriendList(firendList: FriendList) {}

let response = await getAPIResponse()
renderFriendList(response.user.friendList)

export {}

// keyof
type ResponseKeys = keyof APIResponse // 'user'
type UserKeys = keyof APIResponse['user']
