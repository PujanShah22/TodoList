import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
    verticalAlign: "bottom",
    textAlign: "center",
    marginTop: 25,
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    gap: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
  },
  emptyListContainer:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyListText:{
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: "white",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#1b44a0",
    width: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
