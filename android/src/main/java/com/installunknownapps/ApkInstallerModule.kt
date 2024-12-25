package com.installunknownapps

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.Settings
import androidx.core.content.FileProvider
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import java.io.File

class ApkInstallerModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ApkInstaller"
    }

    @ReactMethod
    fun checkInstallPermission(promise: Promise) {
        val context = reactApplicationContext
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val canInstall = context.packageManager.canRequestPackageInstalls()
                promise.resolve(canInstall)
            } else {
                // For versions below Android O, we assume permission is granted by default
                promise.resolve(true)
            }
        } catch (e: Exception) {
            // In case of an unexpected error, especially on MIUI or other custom ROMs
            promise.reject("PERMISSION_CHECK_FAILED", "Failed to check install permission", e)
        }
    }

    @ReactMethod
    fun requestInstallPermission(promise: Promise) {
        try {
            val context = reactApplicationContext
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                UiThreadUtil.runOnUiThread {
                    val intent =
                            Intent(
                                            Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                                            Uri.parse("package:${context.packageName}")
                                    )
                                    .apply { flags = Intent.FLAG_ACTIVITY_NEW_TASK }
                    context.startActivity(intent)
                }
            } else {
                // For Android versions below O, permissions are not required
                promise.resolve(true)
            }
        } catch (e: Exception) {
            // Rejects the promise with a specific error message for debugging
            promise.reject("REQUEST_FAILED", "Failed to request install permission", e)
        }
    }
}
