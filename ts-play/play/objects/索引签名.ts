declare function getStringArray(): StringArray
// ---cut---
interface StringArray {
  [index: number]: string
}
// An index signature property type must be either ‘string’ or ‘number’.
const myArray: StringArray = getStringArray()
const secondItem = myArray[1]
// 数字索引器返回的类型必须是字符串索引器返回类型的子类型。
// number JavaScript实际上会在索引到对象之前将其转换为字符串。

// interface ColorfulCircle extends Colorful, Circle {}

// 交叉类型 和 接口extends
// 两者的主要区别在于如何处理冲突，

// Map<K, V>, Set<T>, and Promise<T>.

// ReadonlyArray<Type> with readonly Type[].
