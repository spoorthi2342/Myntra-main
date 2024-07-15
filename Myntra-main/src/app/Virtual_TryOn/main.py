import os
import cvzone
import cv2
from cvzone.PoseModule import PoseDetector

cap = cv2.VideoCapture('Resources/video.mp4')
detector = PoseDetector()

dressFolderPath = "Resources"
listDress = os.listdir(dressFolderPath)
print(listDress)
fixedRatio = 250/200

while True:
    success, img = cap.read()
    if not success:
        break
    img = detector.findPose(img)
    lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)

    if lmList:
        lm11 = lmList[25][1:3]
        lm12 = lmList[26][1:3]
        imgDress = cv2.imread(os.path.join(dressFolderPath, listDress[0]), cv2.IMREAD_UNCHANGED)
        # img= cvzone.overlayPNG(img, imgDress, lm11)
        print(img)
        # Reduce the size of the dress image

        imgDress = cv2.resize(imgDress, (250, 588), None, 7, 7)
        # imgDress = cv2.resize(imgDress, (0,0), None, 2,2)
        # 200,588
        # center = bboxInfo["center"]
        # cv2.circle(img, center, 5, (255, 0, 255), cv2.FILLED)
        widthOfDress = int((lm11[0] - lm12[0]) * fixedRatio)
        # print(widthOfDress)

        try:
            # img = cvzone.overlayPNG(img, imgDress, lm11)
            img = cvzone.overlayPNG(img, imgDress, lm12)
        except Exception as e:
            print(f"Error overlaying image: {e}")
            pass

    cv2.imshow("Image", img)
    cv2.waitKey(1)
