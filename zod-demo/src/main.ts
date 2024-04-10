import { z } from 'zod'

// 所有属性都是默认需要的
const Dog = z.object({
  name: z.string().min(4),
  age: z.number(),
})

// 像这样提取推断出的类型
type Dog = z.infer<typeof Dog>

const DogWithBreed = Dog.extend({
  breed: z.string(),
})
