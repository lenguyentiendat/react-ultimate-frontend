//fragment
// JSX: 1 parent 
import './style.css'
const MyComponent = () => {
  // const nameEmployee = "DatLNT@gmail.com"
  // const nameEmployee = 69
  // const nameEmployee = true
  // const nameEmployee = undefined
  const nameEmployee = [1, 2, 3]
  // const nameEmployee = {
  //   age: 23,
  //   name: 'DatLNT',
  // }


  return (
    <>
      <div>{JSON.stringify(nameEmployee)} & cobra update</div>
      <div>{console.log("DatLNT")}</div>
      <div className="child"
        style={{ borderRadius: "50px" }}
      >child</div>
    </>
  )
}


export default MyComponent