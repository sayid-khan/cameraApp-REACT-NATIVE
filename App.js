import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [hasCameraPermissions, sethasCameraPermissions] = useState(null);
  const [camera, setcamera] = useState(null);
  const [image, setimage] = useState(null);
  const [type, settype] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      sethasCameraPermissions(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setimage(data.uri);
    }
  };

  if (hasCameraPermissions === false) {
    <Text>No Camera Access</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setcamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Camera"
        onPress={() => {
          settype(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button
        title="Take Picture"
        onPress={() => {
          takePicture();
        }}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
