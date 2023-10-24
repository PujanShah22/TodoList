import * as React from "react";
import { Text, View, Pressable, Linking, Platform } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import authContext from "../../contexts/AuthContext";
import { styles } from "./styles";

const UserAuthentication = () => {
  const { setIsAuthenticated } = React.useContext(authContext);
  const [isUserAuthenticationEnabled, setIsUserAuthenticationEnabled] =
    React.useState<boolean>(false);

  /** First check if strong biometrics is already enrolled or not **/
  const checkIsUserAuthenticationEnable = async (): Promise<boolean> => {
    const userAuthenticationEnableStatus =
      await LocalAuthentication.isEnrolledAsync();
    setIsUserAuthenticationEnabled(userAuthenticationEnableStatus);

    return userAuthenticationEnableStatus;
  };

  /**
   * If user doesn't have authentication in place then open settings page
   * If user is authenticated then challenge for Authentication
   **/
  const challengeUserBiometric = async (): Promise<void> => {
    const canUserAuthenticate = await checkIsUserAuthenticationEnable();
    if (!canUserAuthenticate) {
      Platform.OS === "ios"
        ? Linking.openURL("App-Prefs:root=TOUCHID_PASSCODE")
        : Linking.sendIntent("android.settings.SECURITY_SETTINGS");
      return;
    }
    const authenticationStatus = await LocalAuthentication.authenticateAsync();

    setIsAuthenticated(authenticationStatus.success);
  };

  React.useEffect(() => {
    checkIsUserAuthenticationEnable();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, width: "75%", textAlign: "center" }}>
        {!isUserAuthenticationEnabled
          ? "Please set up biometric authentication\n(Fingerprint, Face ID etc) to use this app."
          : "Please authenticate yourself to proceed."}
      </Text>

      <Pressable
        style={styles.button}
        onPress={challengeUserBiometric}
        testID={`test-${
          isUserAuthenticationEnabled ? "authenticate" : "set-lock"
        }`}
      >
        <Text style={styles.buttonText}>
          {isUserAuthenticationEnabled ? "Authenticate" : "Set Biometric Lock"}
        </Text>
      </Pressable>
    </View>
  );
};

export default UserAuthentication;
