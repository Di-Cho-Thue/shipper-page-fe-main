import Select from "react-select";

export const TableAction = () => {
  const options1 = [
    { value: "Option1", label: "Option1" },
    { value: "Option2", label: "Option2" },
    { value: "Option3", label: "Option3" },
  ];

  const options2 = [
    { value: "Option1", label: "Option1" },
    { value: "Option2", label: "Option2" },
    { value: "Option3", label: "Option3" },
  ];

  const options3 = [
    { value: "Option1", label: "Option1" },
    { value: "Option2", label: "Option2" },
    { value: "Option3", label: "Option3" },
  ];
  return (
    <div className="table-data__tool">
      <div className="table-data__tool-left df aic">
        <Select options={options1} />
        <Select options={options2} />
        <button className="au-btn-filter">
          <i className="zmdi zmdi-filter-list" />
          filters
        </button>
      </div>
      <div className="table-data__tool-right df aic jcc">
        <button className="au-btn au-btn-icon au-btn--green au-btn--small">
          <i className="zmdi zmdi-plus" />
          add item
        </button>
        <Select options={options3} />
      </div>
    </div>
  );
};
