import PropertyDetails from "../../components/PropertyDetails";

const PropertyDetailWrapper = ({ route, navigation }) => {
  const { item } = route?.params;

  console.log(item?.propertyDetails?.InclusivePrice);
  return (
    <PropertyDetails
      title={item?.propertyDetails?.title}
      images={item?.upload?.images}
      price={item?.propertyDetails?.InclusivePrice}
      location={item?.locationAndAddress}
      bedrooms={item?.propertyDetails?.bedRooms}
      text={item?.propertyDetails?.description ?? ""}
      features={item?.amenities}
      listingOwner={item?.contactDetails?.ListingOwner}
      contactPerson={item?.contactDetails?.contactPerson}
      email={item?.contactDetails?.email}
      phone={item?.contactDetails?.phone}
      status={item?.typesAndPurpose?.purpose}
      //  parkingSpace={property1?.number_of_garage}
      bathrooms={item?.propertyDetails?.bathRooms}
      // garage={property1?.number_of_garage}
      area={item?.propertyDetails?.areaSquare}
      category={item?.typesAndPurpose?.category}
      aracbiDescription={item?.propertyDetails?.descriptionArabic}
      navigateBack={navigation.goBack}
      navigation={navigation}
    />
  );
};
export default PropertyDetailWrapper;
