import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Components/StoreList/Card/Card";
import Map from "../../../Components/StoreList/Map/Map";
import { URL } from "../../../env";
import { storeListGet } from "../../../redux/storeList/storeListAction";
import "../Storelist.css";

const LeftColumn = () => {
  const [storeId, setStoreId] = useState(null)
  const [storeVisible, setStoreVisible] = useState(false)
  const [searchStore, setSearchStore] = useState('')

  const dispatch = useDispatch();

  const StoreData = useSelector((state) => state)

  const map_section = useRef();
  const store_section = useRef();

  useEffect(() => {
    const getStores = async () => {
      axios
        .get(`${URL}/get_stores`)
        .then((response) => {
          dispatch(storeListGet(response.data.stores));
        });
    };
    getStores();

  }, []);

  const showCard = (id) => {
    setStoreId(id)
    setStoreVisible(true)
    map_section.current.scrollIntoView({ behavior: 'smooth' });
  }

  const hideCard = () => {
    setStoreVisible(false)
    store_section.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div className="container m-0 p-0 col-12 col-sm-12 col-md-5 leftColumnMain">
        <div className="form-control searchBar">
          <input
            type="text"
            className="inputSearch"
            placeholder="Search store"
            onChange={(e) => setSearchStore(e.target.value)}
          ></input>

          <i className="fas fa-search searchIcon" style={{ curser: 'pointer' }}></i>
        </div>
      </div>
      <div className="container-fluid p-0 mt-2">
        <div className="leftColumn row m-0" ref={store_section}>

          <div className="col-12 col-sm-4 col-md-4 col-lg-4 storeCardsMain">
            {/* {Array.from({ length: 4 }).map((item, index) => (
            <Card key={index + 1} />
          ))} */}
            {StoreData != null &&
              StoreData.filter((item) => {
                if (searchStore === '') {
                  return item
                }
                else if (item.name_fr.toLowerCase().includes(searchStore.toLowerCase())) {
                  return item
                }
                else if (item.address.toLowerCase().includes(searchStore.toLowerCase())) {
                  return item
                }
              })
                .map((item, index) => (
                  <Card
                    showCard={showCard}
                    id={item.id}
                    store={item}
                    key={index + 1}
                    name={item.name_fr}
                    image={item.image}
                    address={item.address}
                    phone_no={item.phone}
                    working_days={JSON.parse(item.workingdays)}
                    open_time={item.open_time}
                    closing_time={item.close_time}
                    url={item.url_field}
                  />
                ))}
          </div>
          <div className="col-12 col-sm-8 col-md-8 col-lg-8 mapsMain" ref={map_section}>
            <Map storeId={storeId} storeVisible={storeVisible} showCard={showCard} hideCard={hideCard} />
          </div>
        </div>
      </div>

    </>
  );
};

export default LeftColumn;
