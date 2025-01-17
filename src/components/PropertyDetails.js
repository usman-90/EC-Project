import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { Button } from "react-native";



import {
    Image,
    ScrollView,
    Alert,
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity,
} from "react-native";
import SimpleMenu from "./PopUpMenu";
import {
    getOneSavedProperties,
    saveProperty,
    deleteSavedProperties,
    deleteProperty,
    getPropertyByPropertyId,
} from "../apiFunctions/properties";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { Linking } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import AntDesingIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Pin from "../../assets/Properties/location-pin.png";
import { useEffect, useState } from "react";
import Back from "../../assets/Search/Notification.png";
import Like from "../../assets/Properties/Like.png";
import MainIMG from "../../assets/Properties/IMG.png";
import Star from "../../assets/Properties/star.png";
import { setPropertyData } from "../features/property/propertySlice";
import { CommonActions } from "@react-navigation/native";

const detailsNames = [
    "Price",
    "Property Size",
    "Bedrooms",
    "Parking Size",
    "Bathrooms",
    "Property Type",
    "Property Status",
];
const featureIcons = {
    "Electricity Backup": (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 17,
                width: 20
            }}
            name="bolt"
        />
    ),
    "Maintenance Staff": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="group"
        />
    ),
    "Double Glazed Windows": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
                width: 20
            }}
            name="drag-handle"
        />
    ),
    "Freehold": (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 17,
                width: 20
            }}
            name="palette"
        />
    ),
    "Waste Disposal": (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 17,
                width: 20
            }}
            name="trash"
        />
    ),
    "Security Staff": (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 17,
                width: 20
            }}
            name="user-secret"
        />
    ),
    "Swimming Pool": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
                width: 20
            }}
            name="pool"
        />
    ),
    "Steam Room": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="hot-tub"
        />
    ),
    "First Aid Medical Center": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="medical-services"
        />
    ),
    "CCTV security": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="videocam"
        />
    ),
    "Conference Room": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="meeting-room"
        />
    ),
    "Service Elevator": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="elevator"
        />
    ),
    "Facilities for Disabled": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="wheelchair-pickup"
        />
    ),
    "Shared Kitchen": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="kitchen"
        />
    ),
    "ATM Facility": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="local-atm"
        />
    ),
    "Centrally Air-Conditioned": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="ac-unit"
        />
    ),
    "Study Room": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="menu-book"
        />
    ),
    "Central Heating": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="microwave"
        />
    ),
    "Barbeque": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="outdoor-grill"
        />
    ),
    "Care": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="spa"
        />
    ),
    "Satellite/Cable Tv": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="satellite"
        />
    ),
    "Reception/Waiting room": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="airline-seat-recline-extra"
        />
    ),
    "Lobby in Building": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="weekend"
        />
    ),
    "Kids Play Area": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="child-care"
        />
    ),
    "24 Hours Challenge": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="local-convenience-store"
        />
    ),
    "Maids Room": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="face"
        />
    ),
    Garden: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 15,
                width: 20
            }}
            name="swimming-pool"
        />
    ),
    Jacuzzi: (
        <AntDesingIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="wifi"
        />
    ),

    "Laundry Facility": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="local-laundry-service"
        />
    ),
    completionYear: (
        <AntDesingIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="calendar"
        />
    ),
    totalFloors: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="building"
        />
    ),
    mainFeatures: (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="featured-play-list"
        />
    ),
    landArea: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="landmark"
        />
    ),
    nearbyHospitals: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="hospital-alt"
        />
    ),
    distance: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="car-alt"
        />
    ),
    otherNearbyPlaces: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="landmark"
        />
    ),
    view: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="street-view"
        />
    ),
    petPolicy: (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="pets"
        />
    ),
    Furnished: (
        <CommunityIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="sofa"
        />
    ),
    elevatorBuilding: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="building"
        />
    ),
    otherRooms: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="bed"
        />
    ),
    facilities: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="water"
        />
    ),
    nearbySchool: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="school"
        />
    ),
    nearbyMalls: (
        <AntDesingIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="shoppingcart"
        />
    ),
    nearbyTransport: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="car-alt"
        />
    ),
    parkingSpaces: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 17,
                width: 20
            }}
            name="parking"
        />
    ),
    floor: (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="building"
        />
    ),
    "Lanudry Room": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="local-laundry-service"
        />
    ),
    "Business Center": (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 15,
            }}
            name="business-time"
        />
    ),
    "Storage Areas": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="storage"
        />
    ),
    "Cafeteria or Canteen": (
        <CommunityIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="food"
        />
    ),
    "Prayer Room": (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="pray"
        />
    ),
    Intercom: (
        <AntDesingIcon
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="phone"
        />
    ),
    "Cleaning Services": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="local-laundry-service"
        />
    ),
    Sauna: <FontAwesomeIcon
        style={{
            color: "#FFC70F",
            fontSize: 15,
            width: 20
        }}
        name="bath" />,
    "Balcony or Terrace": (
        <FontAwesomeIcon
            style={{
                color: "#FFC70F",
                fontSize: 16,
                width: 20
            }}
            name="dungeon"
        />
    ),
    "Braodband Internet": (
        <MaterialIcons
            style={{
                color: "#FFC70F",
                fontSize: 20,
            }}
            name="public"
        />
    ),
};

const PropertyDetails = ({
    location,
    title,
    text,
    images,
    price,
    features,
    area,
    bedrooms,
    parkingSpace,
    bathrooms,
    category,
    status,
    navigateBack,
    phone,
    navigation,
    propertyId,
    ownerId,
}) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');
    const { userData } = useSelector((state) => state?.user.data);
    const dispatch = useDispatch();
    const isPropertySavedQuery = useQuery({
        queryKey: ["fetchOnePropertySaved", { userId: userData?._id, propertyId }],
        queryFn: getOneSavedProperties,
        onSuccess: (data) => {
        },
    });
    const deletePropertyMutation = useMutation({
        mutationFn: deleteProperty,
        onSettled: (data, error) => {
            navigation.pop();
        },
        onError: (error) => {
        }
    });
    const editPropertyMutation = useMutation({
        mutationFn: getPropertyByPropertyId,
        onSuccess: (res, error) => {
            const { data } = res.data;
            dispatch(setPropertyData(data));
            // navigation.navigate("CreatePropertyStack", {
            //   screen: "CreatePropertyScreen"
            // });
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'CreatePropertyStack',
                        }
                    ],
                }),
            );

        },
        onError: (error) => {
        }
    });
    const refetchIsPropertySaved = isPropertySavedQuery?.refetch;
    const savePropertyMutation = useMutation({
        mutationFn: saveProperty,
        onSuccess: (data) => {
            refetchIsPropertySaved();
        },
        onSettled: (data, error) => {
        },
    });




    const unSaveProperty = useMutation({
        mutationFn: deleteSavedProperties,
        onSuccess: (data) => {
            refetchIsPropertySaved();
        },
    });
    const loc = location?.location?.split("-");
    const detailsVals = [
        price,
        area,
        bedrooms,
        parkingSpace,
        bathrooms,
        category,
        status,
    ];
    const [isTextExpanded, setIsTextExpanded] = useState(false);
    const [currImage, setCurrImage] = useState(null);
    const openWhatsApp = () => {
        const phoneNumber = +9290078601;

        const whatsappURI = `whatsapp://send?phone=${phoneNumber}`;

        Linking.canOpenURL(whatsappURI)
            .then((supported) => {
                return Linking.openURL(whatsappURI);
                // if (supported) {
                // } else {
                //   console.log("WhatsApp is not installed on the device");
                // }
            })
            .catch((error) =>
                console.error("An error occurred while opening WhatsApp", error),
            );
    };
    let isThisPropertySaved = isPropertySavedQuery?.data?.data?.result ?? null;

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Delete Property",
            "Are you sure you want to delete this property permanently?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => deletePropertyMutation.mutate(propertyId),
                },
            ],
        );



    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`https://ecommerce-stripe-server.vercel.app/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: price  ,
            }),
        });
        const { paymentIntent } = await response.json();

        return {
            paymentIntent,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
        } = await fetchPaymentSheetParams();
        console.log(paymentIntent)
        setKey(paymentIntent?.client_secret)
        const response = await initPaymentSheet({
            merchantDisplayName: "MacWorld Realestate",
            //      customerId: customer,
            //      customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent?.client_secret,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Usman',
            }
        });
        console.log(response)
        if (!response?.error) {
            setLoading(true);
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet({ client_secret: key });
        console.log("Clickded", error)

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };







    return (
        <StripeProvider publishableKey="pk_test_51PSfJA02frVP0OxbP3mZA3nHznJNTtaZT0ZZfZlo1yXoRkkLiXI6AAg9lg8TEQPfvTvCL6DBogL1oBfDJbN3rv2e00GQHzavDo">
            <View className="  basis-full">
                <View className=" px-6 mb-3 flex py-2 flex-row justify-between items-center">
                    <TouchableOpacity onPress={() => navigateBack()}>
                        <View className="rounded-full border p-2 border-gray-300">
                            <AntDesingIcon name="left" />
                        </View>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold">Property Details</Text>

                    <TouchableOpacity
                        onPress={async () => {
                            if (isThisPropertySaved) {
                                unSaveProperty?.mutate(
                                    isPropertySavedQuery?.data?.data?.result?._id,
                                );
                            } else {
                                savePropertyMutation.mutate({
                                    userId: userData?._id,
                                    propertyId,
                                });
                            }
                        }}
                    >
                        <AntDesingIcon
                            name={`${isThisPropertySaved ? "heart" : "hearto"}`}
                            style={{
                                fontSize: 20,
                                color: !isThisPropertySaved ? "black" : "red",
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView className="px-6 mb-20">
                    <View>
                        <Image
                            source={{ uri: currImage ?? images[0] }}
                            className="rounded-2xl w-full h-[335px] "
                        />
                    </View>

                    <View>
                        <Text className="text-3xl font-bold mt-3">{title}</Text>
                    </View>
                    {/* <View className="flex-row items-center">
          <Image source={Star} />
          <Text className="text-base font-bold mx-1 ">4.8</Text>
          <Text className="text-base text-gray-500">(335) | 212 reviews</Text>
        </View> */}
                    {text && (
                        <View>
                            <Text
                                onPress={() => setIsTextExpanded(!setIsTextExpanded)}
                                className="text-sm text-gray-500 mt-3"
                            >
                                {!isTextExpanded ? `${text?.slice(0, 110)}` : text}
                                <Text
                                    onPress={() => setIsTextExpanded(true)}
                                    className="text-black font-bold"
                                >
                                    {!isTextExpanded && text.length > 110 ? ` ...Read more` : null}
                                </Text>
                            </Text>
                        </View>
                    )}
                    <View>
                        <Text className="font-bold text-lg mt-2">Gallery</Text>
                    </View>

                    <ScrollView horizontal={true}>
                        <View className="mt-2 flex-row">
                            {images?.map((item, key) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCurrImage(item);
                                        }}
                                        key={key}
                                    >
                                        <Image
                                            source={{ uri: item }}
                                            style={styles.me_2}
                                            className="w-28 rounded-xl h-28"
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>

                    <View>
                        <Text className="font-bold text-lg mt-2">Property Details</Text>
                    </View>

                    <View className="rounded-lg bg-gray-200 py-1 pb-3 px-3 mt-2">
                        {detailsNames?.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between"
                                >
                                    <Text className="text-base">{item}</Text>
                                    <Text className="text-base">{detailsVals[index]}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <View>
                        <Text className="font-bold text-lg mt-2">Features</Text>
                    </View>

                    <View className="mt-2 flex-row justify-betwee flex-wrap ">
                        {features?.map((elem, idx) => {
                            if (elem.name !== "bathRooms" && elem.name !== "bedRooms") {
                                const Icon = featureIcons[elem.name];
                                const displayText =
                                    elem.value && !isNaN(elem.value)
                                        ? `${elem.name} : ${elem.value}`
                                        : elem.name;
                                return (
                                    <View key={idx} className="my-1 w-[45%] flex-row items-center" style={styles.me_2}>
                                        {Icon}
                                        <Text className="pl-1 w-32">
                                            {displayText}
                                        </Text>
                                    </View>
                                );
                            }
                        })}
                    </View>

                    <View>
                        <Text className="font-bold text-lg mt-2">Address</Text>
                    </View>

                    <View className="rounded-lg bg-gray-200 py-1 pb-3 px-3 mt-2">
                        <View className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between">
                            <Text className="text-base">Country</Text>
                            <Text className="text-base">{loc ? loc[2] : "---"}</Text>
                        </View>
                        <View className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between">
                            <Text className="text-base">City</Text>
                            <Text className="text-base">{loc ? loc[1] : "---"}</Text>
                        </View>
                        <View className="mt-1 pb-1 flex-row border-b border-gray-400 justify-between">
                            <Text className="text-base">Street</Text>
                            <Text className="text-base">{loc ? loc[0] : "---"}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Map", {
                                coords: {
                                    latitude: parseFloat(location?.latitude),
                                    longitude: parseFloat(location?.longitude),
                                },
                                navigateBack: navigation.goBack,
                            });
                        }}
                        className=" flex-row items-center justify-between bg-gray-200 py-4 px-1 my-3 rounded-lg"
                    >
                        <FontAwesomeIcon
                            name="location-arrow"
                            style={{
                                color: "#FFC70F",
                                fontSize: 30,
                                borderRadius: 50,
                            }}
                        />
                        <View>
                            <Text className="text-lg fw-bold">View Property Location</Text>
                        </View>
                        <AntDesingIcon name="arrowright" style={{ fontSize: 22 }} />
                    </TouchableOpacity>
                </ScrollView>

                <View className="flex-row px-6 py-3 bg-gray-50 items-center absolute justify-between  bottom-0 left-0 right-0">
                    <View>
                        <Text className="text-sm text-gray-500 ">Total Price</Text>
                        <Text className="text-lg font-bold ">AED {price}</Text>
                    </View>

                    {ownerId === userData?._id ? (
                        <View className="flex flex-row">
                            <TouchableOpacity
                                onPress={() => {
                                    editPropertyMutation.mutate(propertyId);
                                }}
                            >
                                <AntDesingIcon
                                    style={{
                                        color: "#FFC70F",
                                        fontSize: 24,
                                        marginHorizontal: 16,
                                    }}
                                    name="edit"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={createTwoButtonAlert}>
                                <AntDesingIcon
                                    style={{
                                        color: "red",
                                        fontSize: 22,
                                    }}
                                    name="delete"
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            disabled={!loading}
                            title="Checkout"
                            onPress={openPaymentSheet}
                        >
                            <Text className={`${!loading ? "bg-gray-400" : "bg-primary"}  text-white font-bold text-base py-2 px-4 rounded-xl`}>
                                Booking Now
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    me_2: {
        marginEnd: 15,
    },
    featureIcons: {
        backgroundColor: "red",
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default PropertyDetails;
