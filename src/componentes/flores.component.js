import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import TutorialDataService from "../servicios/flores.service";

function ReactionButton({ reactionType, onClick, count }) {
  return (
    <button onClick={onClick}>
      {reactionType}: {count}
    </button>
  );
  
}

export default class Flores extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        image: "",
        published: false,
      },
      message: "",
      reactions: {
        like: 0,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      },
      comment: "",
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tutorial } = nextProps;
    if (prevState.currentTutorial.id !== tutorial.id) {
      return {
        currentTutorial: tutorial,
        message: "",
      };
    }

    return prevState.currentTutorial;
  }

  componentDidMount() {
    this.setState({
      currentTutorial: this.props.tutorial,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
      },
    }));
  }

  handleReactionClick(reactionType) {
    const newReactions = { ...this.state.reactions };
    newReactions[reactionType]++;
    this.setState({ reactions: newReactions });

    const itemRef = firebase
      .firestore()
      .collection("items")
      .doc(this.state.currentTutorial.id);
    itemRef.update({
      [`${reactionType}_count`]: firebase.firestore.FieldValue.increment(1),
    });
  }

  updatePublished(status) {
    TutorialDataService.update(this.state.currentTutorial.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTutorial() {
    const data = {
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(() => {
        this.setState({
          message: "The flower was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTutorial() {
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    const comment = {
      content: this.state.comment,
      date: new Date(),
    };
    firebase
      .firestore()
      .collection("CajaComentarios")
      .doc(this.state.currentTutorial.id)
      .collection("Comentarios")
      .add(comment)
      .then(() => {
        console.log("Comentario guardado!");
      })
      .catch((error) => {
        console.error("Error al guardar comentario: ", error);
      });
    this.setState({ comment: "" });
  }

  render() {
    const { currentTutorial, reactions, comment } = this.state;

    return (
      <div>
        <h4> Flores Uwu </h4>
        {currentTutorial ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="url"> Imagen: </label>
                <img src={currentTutorial.url} alt="Hola"></img>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona una flor </p>
          </div>
        )}

        <div>
          <ReactionButton
            reactionType="Like"
            onClick={() => this.handleReactionClick("like")}
            count={reactions.like}
          />
          <ReactionButton
            reactionType="Love"
            onClick={() => this.handleReactionClick("love")}
            count={reactions.love}
          />
          <ReactionButton
            reactionType="Haha"
            onClick={() => this.handleReactionClick("haha")}
            count={reactions.haha}
          />
          <ReactionButton
            reactionType="Wow"
            onClick={() => this.handleReactionClick("wow")}
            count={reactions.wow}
          />
          <ReactionButton
            reactionType="Sad"
            onClick={() => this.handleReactionClick("sad")}
            count={reactions.sad}
          />
          <ReactionButton
            reactionType="Angry"
            onClick={() => this.handleReactionClick("angry")}
            count={reactions.angry}
          />
        </div>

        {currentTutorial ? (
          <div className="edit-form">
            <form>{/* existing form elements */}</form>
            <div className="comment-form">
              <form onSubmit={this.handleCommentSubmit}>
                <div className="form-group">
                  <label htmlFor="comment">Ingresa un comentario: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="comment"
                    value={comment}
                    onChange={this.handleCommentChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona una Flor</p>
          </div>
        )}
      </div>
    );
  }
}
