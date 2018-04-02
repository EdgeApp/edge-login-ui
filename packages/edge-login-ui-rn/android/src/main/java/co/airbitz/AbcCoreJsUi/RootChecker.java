package co.airbitz.AbcCoreJsUi;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class RootChecker {
    public static boolean isDeviceRooted() {
        return checkRootBuildTags() || checkRootExecSu();
    }

    private static boolean checkRootBuildTags() {
        String buildTags = android.os.Build.TAGS;
        return buildTags != null && buildTags.contains("test-keys");
    }

//    private static boolean checkRootSuExists() {
//        String[] paths = {"/system/app/Superuser.apk", "/sbin/su", "/system/bin/su", "/system/xbin/su", "/data/local/xbin/su", "/data/local/bin/su", "/system/sd/xbin/su",
//                "/system/bin/failsafe/su", "/data/local/su", "/su/bin/su"};
//        for (String path : paths) {
//            if (new File(path).exists()) return true;
//        }
//        return false;
//    }
//
    private static boolean checkRootExecSu() {
        Process process = null;
        try {
            process = Runtime.getRuntime().exec(new String[]{"/system/xbin/which", "su"});
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            return in.readLine() != null;
        } catch (Throwable t) {
            return false;
        } finally {
            if (process != null) process.destroy();
        }
    }
}
