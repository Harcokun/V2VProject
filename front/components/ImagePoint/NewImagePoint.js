import React, { Component, createRef } from "react";
import { Stage, Layer, Group, Circle, Label, Text } from "react-konva";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

import mapImage from "../../public/images/mapWithoutIndex.png";
import { lookUpCoordination } from "../../utils/constants";

import Images from "./Images";
import CarInfo from "../../utils/types";


const ImagePoint = ({ carsList }) => {
    const [imagePointState, setImagePointState] = useState({
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
      });

    // this.confirmDelete = this.confirmDelete.bind(this);

    useEffect(() => {let jsonImageClickCoordList = JSON.parse(
        localStorage.getItem("imageClickCoordList") || "");
      if (jsonImageClickCoordList) {
        console.log(jsonImageClickCoordList);
        circleListAfterDeleteReload(jsonImageClickCoordList);
      }
      let jsonPrevPiece = JSON.parse(localStorage.getItem("prevPiece") || "");
      if (jsonPrevPiece) {
        setImagePointState({ prevPiece: { ...jsonPrevPiece } });
      }
      let jsonPiece17Pos = JSON.parse(localStorage.getItem("piece17Pos") || "");
      if (jsonPiece17Pos) {
        setImagePointState({ piece17Pos: { ...jsonPiece17Pos } });
      }}, [])

  const circleListAfterDeleteReload = (imageClickCoordList) => {
    let circleListTemp = [];
    imageClickCoordList.map(
      (cur, index) =>
        (circleListTemp[index] = (
          <Label
            id={String(index + 1)}
            x={cur.x}
            y={cur.y}
            draggable
            onClick={handleClickLabel}
            onDragEnd={handleDragLabelCoordination}
          >
            <Circle width={25} height={25} fill="red" shadowBlur={5} />
            <Text text={String(index + 1)} offsetX={3} offsetY={3} />
          </Label>
        ))
    );
    setImagePointState(
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

  const calculateCoordination = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const offset = { x: stage.x(), y: stage.y() };

    const imageClickX = (pointerPosition.x - offset.x) * (1 / stage.scaleX());
    const imageClickY = (pointerPosition.y - offset.y) * (1 / stage.scaleX());

    return { x: imageClickX, y: imageClickY };
  };

 const handleDragLabelCoordination = (e) => {
    let { x, y } = calculateCoordination(e);

    let id = 0;
    let nodes = e.target.findAncestors("Label", true);
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        id = nodes[i].getAttr("id");
      }
    } else {
      id = parseInt(e.target.id());
    }
    const newImageClickCoordList = imagePointState.imageClickCoordList.map((c, i) => {
      if (i === id - 1) {
        // return new coordinate
        return { x, y };
      } else {
        // The rest haven't changed
        return c;
      }
    });

    setImagePointState(newImageClickCoordList);
    localStorage.setItem(
      "imageClickCoordList",
      JSON.stringify([...imagePointState.imageClickCoordList])
    );
  };

  const createPoint = (x, y, car) => {
    setImagePointState(
      {
        imageClickCoordList: [...imagePointState.imageClickCoordList, { x, y }],
      },
      () => {
        console.log(imagePointState.imageClickCoordList);
        setImagePointState(
          {
            circleList: [
              ...imagePointState.circleList,
              <Label
                id={car._id}
                x={x}
                y={y}
                draggable
                onClick={handleClickLabel}
                onDragEnd={handleDragLabelCoordination}
              >
                <Circle width={25} height={25} fill="red" shadowBlur={5} />
                <Text text={car._id} offsetX={3} offsetY={3} />
              </Label>,
            ],
          },
          () => {
            localStorage.setItem(
              "imageClickCoordList",
              JSON.stringify([...imagePointState.imageClickCoordList])
            );
          }
        );
      }
    );
  };

  const getPointFromData = async (carsList) => {
    setImagePointState(
      {
        circleList: [],
        imageClickCoordList: [],
      },
      () => {
        localStorage.setItem("imageClickCoordList", JSON.stringify([]));
        circleListAfterDeleteReload(imagePointState.imageClickCoordList);
      }
    );
    for (let i = 0; i < carsList.length; i++) {
      if (!(carsList[i]._id in imagePointState.prevPiece)) {
        setImagePointState({
          prevPiece: {
            ...imagePointState.prevPiece,
            [carsList[i]._id]: [
              carsList[i].piece,
              imagePointState.piece17Pos[carsList[i]._id],
            ],
          },
        });
      }
      if (carsList[i].piece != 17) {
        console.log(`Reach ${carsList[i].model}`);
        let { x, y } = await lookUpCoordination[carsList[i].piece][carsList[i].location];
        createPoint(x, y, carsList[i]);
      } else {
        console.log(`carsList[i]._id: ${carsList[i]._id}`);
        console.log(imagePointState.prevPiece);
        if (
          (imagePointState.prevPiece[carsList[i]._id][0] == 20 &&
            carsList[i].clockwise == false) ||
          (imagePointState.prevPiece[carsList[i]._id][0] == 36 &&
            carsList[i].clockwise == true)
        ) {
          setImagePointState(
            {
              piece17Pos: { ...imagePointState.piece17Pos, [carsList[i]._id]: "l" },
            },
            async () => {
              let { x, y } = await lookUpCoordination[carsList[i].piece][imagePointState.piece17Pos[carsList[i]._id]][carsList[i].location];
              createPoint(x, y, carsList[i]);
            }
          );
        }
        if (
          (imagePointState.prevPiece[carsList[i]._id][0] == 36 &&
            carsList[i].clockwise == false) ||
          (imagePointState.prevPiece[carsList[i]._id][0] == 18 &&
            carsList[i].clockwise == true)
        ) {
          setImagePointState(
            {
              piece17Pos: { ...imagePointState.piece17Pos, [carsList[i]._id]: "r" },
            },
            async () => {
              let { x, y } = await lookUpCoordination[carsList[i].piece][imagePointState.piece17Pos[carsList[i]._id]][carsList[i].location];
              createPoint(x, y, carsList[i]);
            }
          );
        } else {
          console.log(imagePointState.piece17Pos[carsList[i]._id]);
          let { x, y } = await lookUpCoordination[carsList[i].piece][imagePointState.piece17Pos[carsList[i]._id]][carsList[i].location];
          createPoint(x, y, carsList[i]);
        }
      }
      if (imagePointState.prevPiece[carsList[i]._id][0] != carsList[i].piece) {
        setImagePointState(
          {
            prevPiece: {
              ...imagePointState.prevPiece,
              [carsList[i]._id]: [carsList[i].piece, imagePointState.piece17Pos[carsList[i]._id]],
            },
          },
          () => {
            localStorage.setItem(
              "prevPiece",
              JSON.stringify({ ...imagePointState.prevPiece })
            );
            localStorage.setItem(
              "piece17Pos",
              JSON.stringify({ ...imagePointState.piece17Pos })
            );
          }
        );
      }
    }
  };

  const handleClickImage = (e) => {
    // let { x, y } = this.calculateCoordination(e);
    // this.createPoint(x, y); // do stuff
    getPointFromData(carsList);
  };

  const handleClickLabel = (e) => {
    console.log("click label haha");
    console.log(e);
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

  const confirmDelete = () => {
    console.log(imagePointState.circleList);
    setImagePointState(
      {
        deleteCircleList: [],
      },
      () => {
        console.log(imagePointState.deleteCircleList);
        modalToggle();
      }
    );
  }

  const confirmModalCircleDelete = () => {
    for (let deleteCircle of imagePointState.deleteCircleList) {
      let alreadyGreaterDeleteCircle = [];
      let alreadySmallerDeleteCircle = [];

      for (let i = 0; i < imagePointState.deleteCircleList.length; i++) {
        if (imagePointState.deleteCircleList[i] == deleteCircle) {
          break;
        }

        if (imagePointState.deleteCircleList[i] > deleteCircle) {
          alreadyGreaterDeleteCircle.push(imagePointState.deleteCircleList[i]);
        } else {
          alreadySmallerDeleteCircle.push(imagePointState.deleteCircleList[i]);
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

      imagePointState.imageClickCoordList.splice(deleteCircleIndex, 1);
    }

    circleListAfterDeleteReload(imagePointState.imageClickCoordList);

    modalToggle();
  };

  const handleZoomStage = (event) => {
    const scaleBy = 1.01;

    event.evt.preventDefault();

    if (imagePointState.stageRef.current !== null) {
      const stage = imagePointState.stageRef.current;
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

  const modalToggle = () => {
    setImagePointState({
      showModal: !imagePointstate.showModal,
    });
  };

  const toggleCheckboxHandler = (delete_circle) => () => {
    // https://stackoverflow.com/questions/66434403/how-to-get-multiple-checkbox-values-in-react-js

    const index = imagePointState.deleteCircleList.indexOf(delete_circle);

    if (index > -1) {
      imagePointState.deleteCircleList.splice(index, 1);
    } else {
      setImagePointState(
        {
          deleteCircleList: [...imagePointState.deleteCircleList, delete_circle],
        },
        () => console.log(imagePointState.deleteCircleList)
      );
    }
  };

  const render = () => {
    let { stageWidth, stageHeight } = imagePointState;
    // console.log(imagePointState.image);

    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight * 0.5;

    return (
      <>
        <Stage
          style={{ backgroundColor: "rgb(166, 162, 154)", overflow: "hidden" }}
          width={stageWidth}
          height={stageHeight}
          draggable
          onWheel={handleZoomStage}
          ref={imagePointState.stageRef}
        >
          <Layer>
            <Group>
              <Images
                img={imagePointState.image.src}
                width={600}
                height={300}
                handleClickImage={this.handleClickImage}
              />
              {imagePointState.circleList.length > 0 &&
                imagePointState.circleList.map((curCircle) => curCircle)}
            </Group>
          </Layer>
        </Stage>
        <button onClick={this.confirmDelete}>Delete</button>

        <Modal
          isOpen={imagePointState.showModal}
          toggle={this.modalToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.modalToggle}>
            Delete Circle Point
          </ModalHeader>
          <ModalBody>
            <ul>
              {imagePointState.circleList.map((cur, index) => (
                <CirclePointList
                  key={index}
                  label={index + 1}
                  toggleCheckboxHandler={this.toggleCheckboxHandler}
                  deleteCircleList={imagePointState.deleteCircleList}
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
      </>
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
          onChange={toggleCheckboxHandler(this.props.label)}
          // checked={this.props.deleteCircleList.indexOf(this.props.label) > -1}
        />
        Circle Point {this.props.label}{" "}
      </li>
    );
  }
}

export default ImagePoint;
