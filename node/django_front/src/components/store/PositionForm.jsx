const Form = ({createPos}) => {
    return (
      <form onSubmit={createPos}>
        <input type="text" name="posName" />
        <button type="submit">登録</button>
      </form>
    );
  }
   
  export default Form;