/* eslint-disable react/prop-types */
import { CATALOG_DATA } from "../../test-data";
import { Fragment, useContext, createContext, useState } from "react";
const CatalogContext = createContext();
import "./style.css";

const CatalogContent = ({ date, category, discount, endDate }) => (
  <div className="shrink-0 p-5">
    <CatalogDates dates={date} />

    <p>{category}</p>
    <p className="text-4xl font-bold">{discount}%</p>
    <p>Valid till {endDate}</p>
  </div>
);

function CatalogDates({ dates }) {
  const customStyle = {
    width: "30px",
    height: "30px",
    border: "2px solid white",
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: "50%"
  };
  return (
    <ul className="p-0 flex gap-3">
      {dates.map((date, key) => {
        return (
          <li style={customStyle} key={key}>
            {date}
          </li>
        );
      })}
    </ul>
  );
}

const CatalogImage = ({ image }) => {
  return (
    <img
      style={{ width: "250px", height: "250px", objectFit: "cover" }}
      className="object-cover"
      src={image}
      alt=""
    />
  );
};

function CatalogContainer({ data }) {
  const { extraData } = useContext(CatalogContext);

  const customStyle = {
    height: "250px",
    backgroundColor: extraData.componentBackgroundColor,
    borderRadius: extraData.itemBorderRadius,
    maxWidth: "600px"
  };

  return (
    <div
      style={customStyle}
      className="bg-cyan-500 w-4/6 m-auto overflow-hidden mt-6 shadow-md"
    >
      <article className="flex justify-between text-white">
        <CatalogContent
          category={data.category}
          discount={data.discount}
          endDate={data.endDate}
          date={data.date}
        />
        <CatalogImage image={data.image} />
      </article>
    </div>
  );
}

function CatalogFilter({ filters }) {
  const { setFilters } = useContext(CatalogContext);

  return (
    <ul className="flex justify-center">
      {filters.map((filter, key) => {
        return (
          <label key={key} htmlFor={filter} className="mx-3 ">
            <input
              onClick={(e) => {
                setFilters(e.target.checked ? filter : "");
              }}
              type="checkbox"
              name={filter}
              id={filter}
              value={filter}
            />
            {filter}
          </label>
        );
      })}
    </ul>
  );
}

const CatalogV2 = () => {
  const props = {
    data: {
      extraData: {
        componentBackgroundColor: "pink",
        itemBorderRadius: "25px"
      }
    }
  };

  const [filters, setFilters] = useState("");

  const _filters = CATALOG_DATA.map((data) => data.category);
  const filtersNoRepeat = Array.from(new Set(_filters));
  const { data } = props;
  const { extraData } = props.data;

  const catalogItems = CATALOG_DATA.filter((data) =>
    filters ? data.category === filters : true
  ).map((data, key) => (
    <Fragment key={key}>
      <CatalogContainer data={data} />
    </Fragment>
  ));

  return (
    <CatalogContext.Provider value={{ data, extraData, setFilters }}>
      <CatalogFilter filters={filtersNoRepeat} />
      <section className="catalog-container">{catalogItems}</section>
    </CatalogContext.Provider>
  );
};

export default CatalogV2;
