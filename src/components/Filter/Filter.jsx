// import "./Filter.scss";
import { InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFilter, getFilterItems } from "redux/phonebook";

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = (e) => dispatch(getFilterItems(e.target.value));

  return (
    <InputGroup className="filter-input mb-3">
      <InputGroup.Text id="inputGroup"> Поиск:</InputGroup.Text>

      <FormControl
        autoComplete="off"
        className="filter-input__text "
        type="text"
        value={filter}
        name="filter"
        onChange={changeFilter}
        aria-describedby="inputGroup"
      />
    </InputGroup>
  );
};

export default Filter;
