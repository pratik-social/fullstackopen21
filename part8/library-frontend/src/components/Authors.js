import { ALL_AUTHORS,UPDATE_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const Authors = (props) => {

  const [name, setName ] = useState('')
  let [born, setBorn ] = useState('')
  const result = useQuery(ALL_AUTHORS);
  const [changeBirth] = useMutation(UPDATE_AUTHOR,{
    refetchQueries:[ {query: ALL_AUTHORS}]})

  console.log(result);
  if (!props.show) {
    return null;
  }

  const onSubmitForm = (event) => {
    event.preventDefault()
    born = Number(born)
    changeBirth({ variables:{ name, born}})
    setName('')
    setBorn('')
  }

  const authors = result?.data?.allAuthors ?? [];
  // console.log(result.data.allAuthors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set BirthYear</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          name
          <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}/>
        </div>
        <div>
          born
          <input type="number" value={born} onChange={(event)=>{setBorn(event.target.value)}}/>
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default Authors;
