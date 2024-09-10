import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Tabs from "./components/Tabs/Tabs";
import Tab from "./components/Tabs/Tab";
import Box from "./components/Box/Box";
import Image from "./components/Box/Image";
import Button from "./components/Button/Button";
import ImageGrid from "./components/ImageGrid/ImageGrid";
// Moving images
import Falling from "./static/images/Moving/falling-down.png";
import Balancing from "./static/images/Moving/balancing-boxes.png";
import Ladder from "./static/images/Moving/carrying-ladder.png";
import Lamp from "./static/images/Moving/carrying-lamp.png";
import Thumb from "./static/images/Moving/green-thumb.png";
import TeamWork from "./static/images/Moving/teamwork.png";
import MovingThemeImage from "./static/images/Moving/theme.png";
// Exercising Images
import Aerobic from "./static/images/Exercising/aerobics.png";
import Balance from "./static/images/Exercising/balance.png";
import Crunch from "./static/images/Exercising/doing-crunches.png";
import Dumbbell from "./static/images/Exercising/dumbbell.png";
import Hoop from "./static/images/Exercising/hoop.png";
import Stretch from "./static/images/Exercising/stretch.png";
import ExercisingThemeImage from "./static/images/Exercising/theme.png";
//Yoga Images
import Lotus from "./static/images/Yoga/Lotus.png";
import Ship from "./static/images/Yoga/Ship.png";
import Shouldstand from "./static/images/Yoga/Shouldstand.png";
import Tree from "./static/images/Yoga/Tree.png";
import Triangle from "./static/images/Yoga/Triangle.png";
import Twist from "./static/images/Yoga/Twist.png";
import YogaThemeImage from "./static/images/Yoga/theme.png";
//Toilet images
import Help from "./static/images/Toilet/help.png"
import Hold from "./static/images/Toilet/hold.png"
import Peek from "./static/images/Toilet/peek.png"
import Rest from "./static/images/Toilet/rest.png"
import Smelly from "./static/images/Toilet/smelly.png"
import Squat from "./static/images/Toilet/squat.png"
import ToiletThemeImage from "./static/images/Toilet/theme.png";

import BGImage from "./static/images/bg.jpg";

const serverURL = "http://localhost:5000";

const imageSets = {
  moving: {
    images: [Falling, Balancing, Ladder, Lamp, Thumb, TeamWork],
    placeholder: MovingThemeImage,
  },
  exercising: {
    images: [Aerobic, Balance, Crunch, Dumbbell, Hoop, Stretch],
    placeholder: ExercisingThemeImage,
  },
  yoga: {
    images: [Lotus, Ship, Shouldstand, Tree, Triangle, Twist],
    placeholder: YogaThemeImage,
  },
  toilet: {
    images: [Help, Hold, Peek, Rest, Smelly, Squat],
    placeholder: ToiletThemeImage
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #ffde00;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const BodyContainer = styled.div`
  width: 100vw;
  height: 500px;
  background-image: url(${BGImage});
  background-repeat: repeat;
  background-position: left top;
  background-attachment: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxAnimation = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [openedImages, setOpenedImages] = useState([]);
  const [activeTab, setActiveTab] = useState("choose-box");
  const [canOpenBox, setCanOpenBox] = useState(true);

  useEffect(() => {
    if (selectedBox) {
      axios
        .get(`${serverURL}/api/images/${selectedBox}`)
        .then((response) => {
          setOpenedImages(response.data);
          axios
            .get(`${serverURL}/api/can-open-box`)
            .then((res) => setCanOpenBox(res.data.canOpen))
            .catch((err) =>
              console.error("Error checking box opening status", err),
            );
        })
        .catch((error) => {
          console.error("There was an error fetching the images!", error);
        });
    }
  }, [selectedBox]);

  const startSpinning = () => {
    setIsSpinning(true);
    let interval;

    interval = setInterval(() => {
      const randomImage =
        imageSets[selectedBox].images[
          Math.floor(Math.random() * imageSets[selectedBox].images.length)
        ];
      setCurrentImage(randomImage);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalImage =
        imageSets[selectedBox].images[
          Math.floor(Math.random() * imageSets[selectedBox].images.length)
        ];
      setCurrentImage(finalImage);
      setIsSpinning(false);
      setCanOpenBox(false);

      axios
        .post(`${serverURL}/api/images/${selectedBox}`, {
          imageUrl: finalImage,
        })
        .then((response) => {
          setOpenedImages((prevImages) => [...prevImages, finalImage]);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            alert(
              "You have already opened a box today. Please try again tomorrow after 10 AM GMT+2.",
            );
          } else {
            console.error("There was an error saving the image!", error);
          }
          setIsSpinning(false);
        });
    }, 5000); // 5 seconds
  };

  return (
    <Container>
      <Tabs>
        <Tab
          isactive={activeTab === "choose-box"}
          onClick={() => setActiveTab("choose-box")}
        >
          Choose Box
        </Tab>
        <Tab
          isactive={activeTab === "opened-images"}
          onClick={() => setActiveTab("opened-images")}
        >
          Opened Smiski
        </Tab>
      </Tabs>

      <BodyContainer>
        <TabsContainer>
          {Object.keys(imageSets).map((box) => (
            <Tab
              key={box}
              isactive={selectedBox === box}
              onClick={() => {
                setSelectedBox(box);
                setCurrentImage(null);
              }}
            >
              {box.toUpperCase()}
            </Tab>
          ))}
        </TabsContainer>
        {activeTab === "choose-box" && (
          <>
            {selectedBox && (
              <>
                <Box isSpinning={isSpinning}>
                  <Image
                    src={currentImage || imageSets[selectedBox].placeholder}
                    alt="Random Content"
                  />
                </Box>
                <Button onClick={startSpinning} disabled={!canOpenBox}>
                  {canOpenBox ? "Open Box" : "Come back tomorrow!"}
                </Button>
              </>
            )}
          </>
        )}
        {activeTab === "opened-images" && <ImageGrid images={openedImages} />}
      </BodyContainer>
    </Container>
  );
};

export default BoxAnimation;
