import React, { Component, createRef } from "react";
import { Stage, Layer, Group, Circle, Label, Text } from "react-konva";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";
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
    };

    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentDidMount() {
    let jsonImageClickCoordList = JSON.parse(
      localStorage.getItem("imageClickCoordList")
    );
    if (jsonImageClickCoordList) {
      console.log(jsonImageClickCoordList);
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

  createPoint = (x, y, car) => {
    this.setState(
      {
        imageClickCoordList: [...this.state.imageClickCoordList, { x, y }],
      },
      () => {
        console.log(this.state.imageClickCoordList);
        this.setState(
          {
            circleList: [
              ...this.state.circleList,
              <Label
                id={car._id}
                x={x}
                y={y}
                draggable
                onClick={this.handleClickLabel}
                onDragEnd={this.handleDragLabelCoordination}
              >
                <Circle width={25} height={25} fill="red" shadowBlur={5} />
                <Text text={car._id} offsetX={3} offsetY={3} />
              </Label>,
            ],
          },
          () => {
            localStorage.setItem(
              "imageClickCoordList",
              JSON.stringify([...this.state.imageClickCoordList])
            );
          }
        );
      }
    );
  };

  getPointFromData = async (carsList) => {
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
    for (let i = 0; i < carsList.length; i++) {
      if (!(carsList[i]._id in this.state.prevPiece)) {
        this.setState({
          prevPiece: {
            ...this.state.prevPiece,
            [carsList[i]._id]: [
              carsList[i].piece,
              this.state.piece17Pos[carsList[i]._id],
            ],
          },
        });
      }
      if (carsList[i].piece != 17) {
        console.log(`Reach ${carsList[i].model}`);
        let { x, y } = await lookUpCoordination[carsList[i].piece][carsList[i].location];
        this.createPoint(x, y, carsList[i]);
      } else {
        console.log(`carsList[i]._id: ${carsList[i]._id}`);
        console.log(this.state.prevPiece);
        if (
          (this.state.prevPiece[carsList[i]._id][0] == 20 &&
            carsList[i].clockwise == false) ||
          (this.state.prevPiece[carsList[i]._id][0] == 36 &&
            carsList[i].clockwise == true)
        ) {
          this.setState(
            {
              piece17Pos: { ...this.state.piece17Pos, [carsList[i]._id]: "l" },
            },
            async () => {
              let { x, y } = await lookUpCoordination[carsList[i].piece][this.state.piece17Pos[carsList[i]._id]][carsList[i].location];
              this.createPoint(x, y, carsList[i]);
            }
          );
        }
        if (
          (this.state.prevPiece[carsList[i]._id][0] == 36 &&
            carsList[i].clockwise == false) ||
          (this.state.prevPiece[carsList[i]._id][0] == 18 &&
            carsList[i].clockwise == true)
        ) {
          this.setState(
            {
              piece17Pos: { ...this.state.piece17Pos, [carsList[i]._id]: "r" },
            },
            async () => {
              let { x, y } = await lookUpCoordination[carsList[i].piece][this.state.piece17Pos[carsList[i]._id]][carsList[i].location];
              this.createPoint(x, y, carsList[i]);
            }
          );
        } else {
          console.log(this.state.piece17Pos[carsList[i]._id]);
          let { x, y } = await lookUpCoordination[carsList[i].piece][this.state.piece17Pos[carsList[i]._id]][carsList[i].location];
          this.createPoint(x, y, carsList[i]);
        }
      }
      if (this.state.prevPiece[carsList[i]._id][0] != carsList[i].piece) {
        this.setState(
          {
            prevPiece: {
              ...this.state.prevPiece,
              [carsList[i]._id]: [carsList[i].piece, this.state.piece17Pos[carsList[i]._id]],
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
      }
    }
  };

  handleClickImage = (e) => {
    // let { x, y } = this.calculateCoordination(e);
    // this.createPoint(x, y); // do stuff
    this.getPointFromData(this.props.carsList);
  };

  handleClickLabel = (e) => {
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
      <>
        <Stage
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
