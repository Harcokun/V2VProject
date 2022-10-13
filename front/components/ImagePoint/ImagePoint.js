import React, { Component, createRef } from "react";
import { Stage, Layer, Group, Circle, Label, Text } from "react-konva";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

import mapImage from "../../public/images/mapWithoutIndex.png";
import { lookUpCoordination } from "../../utils/constants";

import Images from "./Images";
// import Image from "next/image";

// const Images = dynamic(() => import("./Images"), {
//   ssr: false,
// });

// import { loadImage } from "canvas";

// export async function getImage(src, cb) {
//   return loadImage(src)
//     .then((image) => image)
//     .catch((err) => console.log(err));
// }

const DEFAULT_MACID = "D6:93:EB:A8:C1:5D";

class ImagePoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: mapImage,
      circleList: [],
      stageRef: createRef(null),
      stageWidth: 0,
      stageHeight: 0,
      showModal: false,
      deleteCircleList: [],
      imageClickCoordList: [],
      prevPiece: {},
      piece17Pos: {},
      locBuffer: {},
      getCoordFromData: this.getCoordFromData,
    };

    this.confirmDelete = this.confirmDelete.bind(this);
    // this.getCoordFromData = this.getCoordFromData(this.props.carsList);
  }

  componentDidMount() {
    // localStorage.clear();
    let jsonImageClickCoordList = JSON.parse(
      localStorage.getItem("imageClickCoordList")
    );
    if (jsonImageClickCoordList) {
      // console.log(jsonImageClickCoordList);
      this.circleListAfterDeleteReload(jsonImageClickCoordList);
    }

    let jsonPrevPiece = JSON.parse(localStorage.getItem("prevPiece"));
    if (jsonPrevPiece) {
      this.setState({ prevPiece: { ...jsonPrevPiece } });
    }

    let jsonPiece17Pos = JSON.parse(localStorage.getItem("piece17Pos"));
    if (jsonPiece17Pos) {
      this.setState({ piece17Pos: { ...jsonPiece17Pos } });
    }

    let jsonLocBuffer = JSON.parse(localStorage.getItem("locBuffer"));
    if (jsonLocBuffer) {
      this.setState({ locBuffer: { ...jsonLocBuffer } });
    }
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.activeCarsList !== this.props.activeCarsList);
    if (prevProps.activeCarsList !== this.props.activeCarsList) {
      console.log(`Refreshed in ImagePoint!`);
      this.getCoordFromData(this.props.activeCarsList);
    }
  }

  circleListAfterDeleteReload = (imageClickCoordList) => {
    let circleListTemp = [];
    imageClickCoordList.map(
      (cur, index) =>
        (circleListTemp[index] = (
          <Label
            id={index + 1}
            x={cur.x}
            y={cur.y}
            draggable
            onClick={this.handleClickLabel}
            onDragEnd={this.handleDragLabelCoordination}
          >
            <Circle width={25} height={25} fill="red" shadowBlur={5} />
            <Text text={index + 1} offsetX={3} offsetY={3} />
          </Label>
        ))
    );
    this.setState(
      {
        circleList: [...circleListTemp],
        imageClickCoordList: [...imageClickCoordList],
      },
      () => {
        localStorage.setItem(
          "imageClickCoordList",
          JSON.stringify([...imageClickCoordList])
        );
      }
    );
  };

  calculateCoordination = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const offset = { x: stage.x(), y: stage.y() };

    const imageClickX = (pointerPosition.x - offset.x) * (1 / stage.scaleX());
    const imageClickY = (pointerPosition.y - offset.y) * (1 / stage.scaleX());

    return { x: imageClickX, y: imageClickY };
  };

  handleDragLabelCoordination = (e) => {
    let { x, y } = this.calculateCoordination(e);

    let id = 0;
    let nodes = e.target.findAncestors("Label", true);
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        id = nodes[i].getAttr("id");
      }
    } else {
      id = parseInt(e.target.id());
    }

    this.state.imageClickCoordList[id - 1] = { x, y };
    localStorage.setItem(
      "imageClickCoordList",
      JSON.stringify([...this.state.imageClickCoordList])
    );
  };

  pointManager = async (activeCarsList) => {
    let coordList = {};

  }

  createPoint = async (x, y, macId) => {
    this.setState(
      {
        imageClickCoordList: [...this.state.imageClickCoordList, { x, y }],
      },
      () => {
        let text = (macId == DEFAULT_MACID? "1" : "2");
        this.setState(
          {
            circleList: [
              ...this.state.circleList,
              <Label
                id={macId}
                x={x}
                y={y}
                draggable
                onClick={this.handleClickLabel}
                onDragEnd={this.handleDragLabelCoordination}
              >
                <Circle width={25} height={25} fill="red" shadowBlur={5} />
                {/* <Images
                  img={"/icons/car_icon_red.png"}
                /> */}
                <Text text={text} offsetX={3} offsetY={3} />
              </Label>,
            ],
          },
          () => {
            console.log("MacId, x ,y: ", macId, x, y);
            console.log("CircleList: ", this.state.circleList);
            localStorage.setItem(
              "imageClickCoordList",
              JSON.stringify([...this.state.imageClickCoordList])
            );
          }
        );
      }
    );
  };

  scaleSideLocation = (location) => {
    if (location <= 0) return 0;
    if (location >= 1 && location <= 4) return 1;
    if (location >= 5 && location <= 10) return 10;
    if (location >= 11 && location <= 14) return 11;
    if (location >= 15 && location <= 20) return 20;
    if (location >= 22 && location <= 29) return 22;
    if (location >= 30 && location <= 35) return 35;
    if (location >= 37) return 37;
    return location;
  };

  scale34Location = (location) => {
    if (location <= 0) return 0;
    if (location >= 1 && location <= 4) return 1;
    if (location >= 5 && location <= 10) return 10;
    if (location >= 11 && location <= 14) return 11;
    if (location >= 15 && location <= 20) return 20;
    if (location >= 21 && location <= 24) return 21;
    if (location >= 25 && location <= 30) return 30;
    if (location >= 31) return 31;
    return location;
  };

  scale36Location = (location) => {
    if (location <= 0) return 0;
    if (location >= 2 && location <= 9) return 2;
    if (location >= 10 && location <= 15) return 15;
    if (location >= 17 && location <= 24) return 17;
    if (location >= 25 && location <= 30) return 30;
    if (location >= 32 && location <= 38) return 32;
    if (location >= 39 && location <= 45) return 45;
    if (location >= 47) return 37;
    return location;
  };

  getCoordFromData = async (activeCarsList) => {
    // console.log("activeCarsList in ImagePoint", activeCarsList);
    this.setState(
      {
        circleList: [],
        imageClickCoordList: [],
      },
      () => {
        localStorage.setItem("imageClickCoordList", JSON.stringify([]));
        this.circleListAfterDeleteReload(this.state.imageClickCoordList);
      }
    );
    for (let macId in activeCarsList) {
      // console.log(`macId: ${macId}`);
      if (!(macId in this.state.prevPiece)) {
        // console.log(`carList.macId`);
      // console.log(activeCarsList[macId]);
        this.setState({
          piece17Pos: { ...this.state.piece17Pos, [macId]: "l" },
          prevPiece: {
            ...this.state.prevPiece,
            [macId]: [
              activeCarsList[macId].piece,
              this.state.piece17Pos[macId]? this.state.piece17Pos[macId] : "l",
            ],
          },
        });
      }
      // console.log(`this.prevPiece: ${JSON.stringify(this.state.prevPiece)}`)
      if (activeCarsList[macId].piece != 17) {
        // console.log(`Reach ${activeCarsList[macId].Model}`);
        let location;
        if (activeCarsList[macId].piece == 18 || activeCarsList[macId].piece == 20)
          location = this.scaleSideLocation(activeCarsList[macId].location);
        if (activeCarsList[macId].piece == 34)
          location = this.scale34Location(activeCarsList[macId].location);
        if (activeCarsList[macId].piece == 36)
          location = this.scale36Location(activeCarsList[macId].location);
        // if (activeCarsList[macId].piece == 33) location = activeCarsList[macId].location;
        else location = activeCarsList[macId].location;
        // console.log("location: ", location);
        let { x, y } = await lookUpCoordination[activeCarsList[macId].piece][location];
        await this.createPoint(x, y, macId);
      } else {
        // console.log(`macId: ${macId}`);
        // console.log(this.state.prevPiece);
        let location = this.scaleSideLocation(activeCarsList[macId].location);
        console.log(`this.state.prevPiece: ${this.state.prevPiece}`);
          if (
            (this.state.prevPiece[macId][0] == 20 &&
              activeCarsList[macId].clockwise == false) ||
            (this.state.prevPiece[macId][0] == 36 &&
              activeCarsList[macId].clockwise == true)
          ) {
            this.setState(
              {
                piece17Pos: { ...this.state.piece17Pos, [macId]: "l" },
              },
              async () => {
                let { x, y } = await lookUpCoordination[activeCarsList[macId].piece][
                  this.state.piece17Pos[macId]
                ][location];
                await this.createPoint(x, y, macId);
              }
            );
          }
          if (
            (this.state.prevPiece[macId][0] == 36 &&
              activeCarsList[macId].clockwise == false) ||
            (this.state.prevPiece[macId][0] == 18 &&
              activeCarsList[macId].clockwise == true)
          ) {
            this.setState(
              {
                piece17Pos: { ...this.state.piece17Pos, [macId]: "r" },
              },
              async () => {
                let { x, y } = await lookUpCoordination[activeCarsList[macId].piece][
                  this.state.piece17Pos[macId]
                ][location];
                await this.createPoint(x, y, macId);
              }
            );
          } else {
            // console.log(this.state.piece17Pos[macId]);
            let { x, y } = await lookUpCoordination[activeCarsList[macId].piece][
              this.state.piece17Pos[macId]
            ][location];
            await this.createPoint(x, y, macId);
          }

      }
      // console.log(`macId: ${macId}`);
      // console.log("this.state.prevPiece", this.state.prevPiece);
      // for (let index in this.state.prevPiece[macId]) {
        if (this.state.prevPiece[macId][0] != activeCarsList[macId].piece) {
        this.setState(
          {
            prevPiece: {
              ...this.state.prevPiece,
              [macId]: [
                activeCarsList[macId].piece,
                this.state.piece17Pos[macId],
              ],
            },
          },
          () => {
            localStorage.setItem(
              "prevPiece",
              JSON.stringify({ ...this.state.prevPiece })
            );
            localStorage.setItem(
              "piece17Pos",
              JSON.stringify({ ...this.state.piece17Pos })
            );
          }
        );
      // }
      }
    }
  };

  handleClickImage = (e) => {
    // let { x, y } = this.calculateCoordination(e);
    // this.createPoint(x, y); // do stuff
    this.getCoordFromData(this.props.activeCarsList);
  };

  // handleClick = (e) => {
  //   this.inputElement.click();
  //   this.getCoordFromData(this.props.activeCarsList);
  // };

  handleClickLabel = (e) => {
    // console.log("click label haha");
    // console.log(e);
    // // https://stackoverflow.com/questions/64473531/how-to-obtain-id-of-konva-label-from-konvas-dblclick-event
    // let nodes = e.target.findAncestors('Label', true);
    // if (nodes.length > 0) {
    //   for (let i = 0; i < nodes.length; i++){
    //     let id = nodes[i].getAttr("id")
    //     console.log('shape ' + i + ' ID (dblclick)', id )
    //   }
    // } else {
    //       console.log('ID (dblclick) = ' + parseInt(e.target.id()));
    // }
  };

  confirmDelete() {
    console.log(this.state.circleList);
    this.setState(
      {
        deleteCircleList: [],
      },
      () => {
        console.log(this.state.deleteCircleList);
        this.modalToggle();
      }
    );
  }

  confirmModalCircleDelete = () => {
    for (let deleteCircle of this.state.deleteCircleList) {
      let alreadyGreaterDeleteCircle = [];
      let alreadySmallerDeleteCircle = [];

      for (let i = 0; i < this.state.deleteCircleList.length; i++) {
        if (this.state.deleteCircleList[i] == deleteCircle) {
          break;
        }

        if (this.state.deleteCircleList[i] > deleteCircle) {
          alreadyGreaterDeleteCircle.push(this.state.deleteCircleList[i]);
        } else {
          alreadySmallerDeleteCircle.push(this.state.deleteCircleList[i]);
        }
      }

      console.log(alreadyGreaterDeleteCircle);
      console.log(alreadySmallerDeleteCircle);

      let deleteCircleIndex = deleteCircle - 1;

      // if (alreadyGreaterDeleteCircle.length > 0) {
      //   deleteCircleIndex = deleteCircleIndex - alreadyGreaterDeleteCircle.length;
      // }

      if (alreadySmallerDeleteCircle.length > 0) {
        deleteCircleIndex =
          deleteCircleIndex - alreadySmallerDeleteCircle.length;
      }

      this.state.imageClickCoordList.splice(deleteCircleIndex, 1);
    }

    this.circleListAfterDeleteReload(this.state.imageClickCoordList);

    this.modalToggle();
  };

  handleZoomStage = (event) => {
    const scaleBy = 1.01;

    event.evt.preventDefault();

    if (this.state.stageRef.current !== null) {
      const stage = this.state.stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale =
        event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    }
  };

  modalToggle = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  toggleCheckboxHandler = (delete_circle) => () => {
    // https://stackoverflow.com/questions/66434403/how-to-get-multiple-checkbox-values-in-react-js

    const index = this.state.deleteCircleList.indexOf(delete_circle);

    if (index > -1) {
      this.state.deleteCircleList.splice(index, 1);
    } else {
      this.setState(
        {
          deleteCircleList: [...this.state.deleteCircleList, delete_circle],
        },
        () => console.log(this.state.deleteCircleList)
      );
    }
  };

  render() {
    let { stageWidth, stageHeight } = this.state;
    // console.log(this.state.image);

    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight * 0.5;

    // stageWidth = 600;
    // stageHeight =300;

    return (
      <div key={this.props.carsList} onClick={this.handleClick}>
        {/* <input ref={(input) => (this.inputElement = input)} /> */}
        <Stage
          key={this.props.carsList}
          style={{ backgroundColor: "rgb(166, 162, 154)", overflow: "hidden" }}
          width={stageWidth}
          height={stageHeight}
          draggable
          onWheel={this.handleZoomStage}
          ref={this.state.stageRef}
        >
          <Layer>
            <Group>
              <Images
                img={this.state.image.src}
                width={600}
                height={300}
                handleClickImage={this.handleClickImage}
              />
              {this.state.circleList.length > 0 &&
                this.state.circleList.map((curCircle) => curCircle)}
            </Group>
          </Layer>
        </Stage>
        <button onClick={this.confirmDelete}>Delete</button>

        <Modal
          isOpen={this.state.showModal}
          toggle={this.modalToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.modalToggle}>
            Delete Circle Point
          </ModalHeader>
          <ModalBody>
            <ul>
              {this.state.circleList.map((cur, index) => (
                <CirclePointList
                  key={index}
                  label={index + 1}
                  toggleCheckboxHandler={this.toggleCheckboxHandler}
                  deleteCircleList={this.state.deleteCircleList}
                />
              ))}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirmModalCircleDelete}>
              Delete
            </Button>{" "}
            <Button color="secondary" onClick={this.modalToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class CirclePointList extends Component {
  render() {
    return (
      <li style={{ listStyleType: "none" }}>
        <input
          type="checkbox"
          style={{ marginRight: "15px" }}
          onChange={this.props.toggleCheckboxHandler(this.props.label)}
          // checked={this.props.deleteCircleList.indexOf(this.props.label) > -1}
        />
        Circle Point {this.props.label}{" "}
      </li>
    );
  }
}

export default ImagePoint;

// const ImageTest = () => {
//   return <Images img={mapImage} handleClickImage={undefined} />;
// };

// export default ImageTest;