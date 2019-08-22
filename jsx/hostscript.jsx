/*
var obj = {
action:["色", "モノクロ"],
ext:{eps:true,
    jpg:false,
    psd:false,
    tiff:false
},
files:["/Users/kawanoshuji/Desktop/testWatch/bb4b3cc09f294450_1920.jpg"],
flag:true
}
process(obj);
*/
function process(obj){
    for(var i=0;i<obj.files.length;i++){
        try{
            var f = new File(obj.files[i]);
            $.writeln(f);
            app.open(f);
            doAction(obj.action[1],obj.action[0]);
           
            if(obj.ext.psd){
                savePsd();
            }

            if(obj.ext.tiff){
                saveTiff();
            }
            
            if(obj.ext.eps){
                saveEps();
            }

            if(obj.ext.jpg){
                saveJpeg();
            }

            if(obj.flag){
                activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            }
        }catch(e){
            alert(e);
            continue
        }
    }

    function saveTiff(){
        var  fileObj = new File(activeDocument.fullName);
        tiffOpt = new TiffSaveOptions();
        tiffOpt.alphaChannels = true;
        tiffOpt.annotations = true;
        tiffOpt.byteOrder = ByteOrder.MACOS;
        tiffOpt.embedColorProfile = false;
        tiffOpt.imageCompression = TIFFEncoding.NONE;
        tiffOpt.jpegQuality = 3;
        tiffOpt.layerCompression = LayerCompression.RLE;
        tiffOpt.layers = true;
        tiffOpt.saveImagePyramid = false;
        tiffOpt.spotColors = false;
        tiffOpt.transparency = false;
        activeDocument.saveAs(fileObj, tiffOpt, true, Extension.LOWERCASE); 
    }

    function saveJpeg(){
        var  fileObj = new File(activeDocument.fullName);  
        jpegOpt = new JPEGSaveOptions();
        jpegOpt.embedColorProfile = true;
        jpegOpt.quality = 10;
        jpegOpt.formatOptions = FormatOptions.PROGRESSIVE;
        jpegOpt.scans = 3;
        jpegOpt.matte = MatteType.NONE;
        activeDocument.saveAs(fileObj, jpegOpt, true, Extension.LOWERCASE);
    }

    function savePsd(){
        fileObj = new File(activeDocument.fullName);
        psdOpt = new PhotoshopSaveOptions();
        psdOpt.alphaChannels = true;
        psdOpt.annotations = true;
        psdOpt.embedColorProfile = false;
        psdOpt.layers = true;
        psdOpt.spotColors = false;
        activeDocument.saveAs(fileObj, psdOpt, true, Extension.LOWERCASE);
    }

    function saveEps(){
        fileObj = new File(activeDocument.fullName);
        epsOpt = new EPSSaveOptions();
        epsOpt.embedColorProfile = true;
        epsOpt.encoding = SaveEncoding.JPEGMAXIMUM;
        epsOpt.halftoneScreen = false;
        epsOpt.interpolation = false;
        epsOpt.preview = Preview.MACOSJPEG;
        epsOpt.psColorManagement = false;
        epsOpt.transferFunction = false;
        epsOpt.transparentWhites = false;
        epsOpt.vectorData = false;
        activeDocument.saveAs(fileObj, epsOpt, true, Extension.LOWERCASE);
    }
}