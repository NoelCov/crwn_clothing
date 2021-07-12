import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionPage from "../collection/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import { firestore, convertSnapshotToMap } from "../../firebase/firebase.utils";

import { setShopData } from "../../redux/shop/shop.actions";

class ShopPage extends Component {
  componentDidMount() {
    const { setShopData } = this.props;

    const collectionRef = firestore.collection("collections");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsObject = convertSnapshotToMap(snapshot);
        setShopData(collectionsObject);
      }
    );
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setShopData: (data) => dispatch(setShopData(data)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
