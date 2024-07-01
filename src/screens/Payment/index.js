import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    console.log(initPaymentSheet)
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`http://192.168.18.57:3000/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 32000,
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
        setKey(paymentIntent.client_secret)
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


    const openPaymentSheet = async () => {
        console.log(presentPaymentSheet)
        const { error } = await presentPaymentSheet({ client_secret: key });
        console.log("Clickded", error)

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <StripeProvider publishableKey="pk_test_51PSfJA02frVP0OxbP3mZA3nHznJNTtaZT0ZZfZlo1yXoRkkLiXI6AAg9lg8TEQPfvTvCL6DBogL1oBfDJbN3rv2e00GQHzavDo">
            <ScrollView>
                <Button
        variant="primary"
                    disabled={!loading}
                    title="Checkout"
                    onPress={openPaymentSheet}
                />
            </ScrollView>
        </StripeProvider>

    );
}
