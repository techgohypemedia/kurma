Add-Type -AssemblyName System.Drawing
function Crop-Img(, , , , , ) {
     = [System.Drawing.Bitmap]::new()
     = [System.Drawing.Rectangle]::new(, , , )
     = .Clone(, .PixelFormat)
    .Save(, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    .Dispose()
    .Dispose()
    Write-Output ( + " : OK\)
}

 = \C:\Users\kshit\.gemini\antigravity\brain\7e6fd0de-7202-47d9-a938-52d792f9b7fa\.user_uploaded\media_1789543433165.png\
Crop-Img \public\images\community\varun.jpg\ 23 126 142 252
Crop-Img \public\images\community\ananya.jpg\ 177 57 156 161
Crop-Img \public\images\community\simran.jpg\ 178 228 158 206
Crop-Img \public\images\community\sameer.jpg\ 348 128 156 252
Crop-Img \public\images\community\rohit.jpg\ 517 57 157 161
Crop-Img \public\images\community\tanvi.jpg\ 517 228 158 206
Crop-Img \public\images\community\rohan.jpg\ 854 57 154 161
Crop-Img \public\images\community\nikhil.jpg\ 854 228 154 206

 = \C:\Users\kshit\.gemini\antigravity\brain\7e6fd0de-7202-47d9-a938-52d792f9b7fa\.user_uploaded\media_1789542204165.png\
Crop-Img \public\images\community\aishwarya.jpg\ 835 220 165 260

 = \C:\Users\kshit\.gemini\antigravity\brain\7e6fd0de-7202-47d9-a938-52d792f9b7fa\.user_uploaded\media_1789542181974.png\
Crop-Img \public\images\community\siddharth.jpg\ 64 175 165 240
