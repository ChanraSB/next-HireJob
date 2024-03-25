
"use client"
import React, { useState, useEffect } from "react";
import Button from "@/component/base/button/button";
import Card from "../card/Card";
import { getWorkers } from "@/service/workerClient";
import { useRouter } from "next/navigation"
import Link from "next/link";
const SearchBar = () => {
  const router = useRouter()
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("domicile");
  const [sortOrder, setSortOrder] = useState("DESC");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workersData = await getWorkers({
          limit: 10,
          page,
          search: searchText ,
          sort: sortBy,
          sortBy : sortOrder,
        });
        setData(workersData);
      } catch (error) {
        console.error("Error fetching workers:", error.message);
      }
    };

    fetchData();
  }, [page, searchText, sortBy, sortOrder]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1); 
  };
  const handleProfileClick = (id) => {
    router.push(`/main/detail+profile/${id}`);
  };

  
  return (
    <div>
      <div className="bg-body-tertiary my-4">
        <form onSubmit={handleSearchSubmit}>
          <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 d-flex align-items-center justify-content-center bg-light py-3">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <input
                className="form-control form-control-lg"
                type="search"
                placeholder="Search for any skill"
                style={{ border: "none" }}
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-sm-6 col-md-2 col-lg-2 col-xl-2">
              <select
                className="form-select form-select-lg"
                aria-label="Default select example"
                style={{ border: "none" }}
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="created_at">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="domicile">Sort by Domicile</option>
              </select>
            </div>
            <div className="col-sm-6 col-md-2 col-lg-2 col-xl-2">
              <select
                className="form-select form-select-lg"
                aria-label="Default select example"
                style={{ border: "none" }}
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
            </div>
            <div className="col-sm-6 col-md-2 col-lg-2 col-xl-2">
              <Button className="py-3" child="Search" style={{ background: "#5E50A1", color: "white", width: "100%" }} type="submit" />
            </div>
          </div>
        </form>
      </div>

      <div>
        {data?.map((item) => (
          <Card key={item.id} name={item.name} src={item.photo} job={item.job_desk || "-"} address={item.domicile || "-"}>
            {/* Card content */}
            <div className="col-sm-3 col-md-4 col-lg-2 col-xl-2 d-flex justify-content-center align-items-center">
              <Link href={`/main/detail+profile/${item?.id}`}>
      <Button child="Lihat Profile" style={{ background: "#5E50A1", color: "white" }} />
      </Link>
    </div>
          </Card>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <Button child="Prev Page" onClick={handlePrevPage} style={{ background: "#5E50A1", color: "white", width: "100%" }}/>
        <Button child="Next Page" onClick={handleNextPage} style={{ background: "#5E50A1", color: "white", width: "100%" }}/>
      </div>
    </div>
  );
};

export default SearchBar;
