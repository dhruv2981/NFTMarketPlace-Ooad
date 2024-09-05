import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "./uploadNFTIndex.js";

const UloadNFT = ({ uploadToIPFS, createNFT }) => {
  const [price, setPrice] = useState("");
  const [stoploss, setStopLoss] = useState("");
  const [stopprofit, setStopProfit] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [tokenName, setTokenName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const categoryArry = [];

  const router = useRouter();
  const popularCurrencies = [
    "Bitcoin",
    "Ethereum",
    "Litecoin",
    "Dogecoin",
    "Cardano",
    "Solana",
    "Polkadot",
    "Chainlink"
  ];

  const priceMapping = {
    
    "Bitcoin": 100,
    "Ethereum": 200,
    "Litecoin" : 300,
    "Dogecoin" : 400,
    "Cardano" : 500,
    "Solana" : 600,
    "Polkadot" : 700,
    "Chainlink" : 800,
    // ... other currency mappings
  };

  const handleTokenChange = (e) => {
    const selectedToken = e.target.value;
    setTokenName(selectedToken);
    setPrice(priceMapping[selectedToken] || '');
  };
  

  const addTokenToList = () => {
    if (tokenName && percentage) {
      const newToken = { name: tokenName, percentage: parseFloat(percentage) };
      setTokens([...tokens, newToken]);
      setTokenName("");
      setPercentage("");
    }
  };

  const removeToken = (index) => {
    setTokens(tokens.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = () => {
    let totalPercentage = tokens.reduce(
      (acc, curr) => acc + curr.percentage,
      0
    );

    // Ensure percentages add up to 100%
    if (totalPercentage !== 100) {
      alert("Total percentage must add up to 100%");
      return;
    }

    let totalPrice = price;
    tokens.forEach((token) => {
      totalPrice += parseFloat(price) * (token.percentage / 100);
    });
    setTotalPrice(totalPrice);
  };

  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
        properties={properties}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Name</label>
          <input
            type="text"
            placeholder="Name"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="website">Website</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>

            <input
              type="text"
              placeholder="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className={Style.upload_box_input_para}>
            Ciscrypt will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </p>
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="stopLoss">Stop Loss</label>
          <input
            type="text"
            placeholder="Stop Loss"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setStopLoss(e.target.value)}
          />
        </div>


        <div className={formStyle.Form_box_input}>
          <label htmlFor="profitLoss">Stop Profit</label>
          <input
            type="text"
            placeholder="Profit Loss"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setStopProfit(e.target.value)}
          />
        </div>


<div className={formStyle.Form_box_input}>
        <label htmlFor="tokenName">Token Name</label>
        <select
          id="tokenName"
          className={formStyle.Form_box_input_userName}
          value={tokenName}
          onChange={handleTokenChange}
        >
          <option value="">Select Token Name</option>
          {popularCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>


        <div className={formStyle.Form_box_input}>
          <h3>Selected Tokens:</h3>
          <ul>
            {tokens.map((token, index) => (
              <li key={index}>
                {token.name} - {token.percentage}%
              </li>
            ))}
          </ul>

          <ul>
            {tokens.map((token, index) => (
              <li key={index}>
                {token.name} - {token.percentage}%
                <button onClick={() => removeToken(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className={formStyle.Form_box_input}>
          <label htmlFor="Price">Price</label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <FaPercent />
            </div>
            <input
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div> */}



<div className={formStyle.Form_box_input}  >
  <label htmlFor="Price">Price</label>
  <div className={formStyle.Form_box_input_box} style={{ width: '100%' }}>
    <input
      type="text"
      value={price}
      readOnly
      style={{ width: '100%', boxSizing: 'border-box', padding: '15px' }}
    />
  </div>
</div>


      </div>

      <div
        className={Style.upload_box_btn}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          btnName="Upload"
          handleClick={() => {}}
          classStyle={Style.upload_box_btn_style}
        />
      </div>
    </div>
  );
};

export default UloadNFT;
