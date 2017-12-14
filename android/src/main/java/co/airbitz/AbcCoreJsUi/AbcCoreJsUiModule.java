
package co.airbitz.AbcCoreJsUi;
import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyPermanentlyInvalidatedException;
import android.security.keystore.KeyProperties;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SignatureException;
import java.security.UnrecoverableEntryException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

import static co.airbitz.AbcCoreJsUi.AppConstants.DEFAULT_KEY_NAME;
import static co.airbitz.AbcCoreJsUi.AppConstants.DIALOG_FRAGMENT_TAG;
import static co.airbitz.AbcCoreJsUi.PreferenceHelper.getPrefernceHelperInstace;

import com.squareup.whorlwind.ReadResult;
import com.squareup.whorlwind.SharedPreferencesStorage;
import com.squareup.whorlwind.Whorlwind;


public class AbcCoreJsUiModule extends ReactContextBaseJavaModule {
    private static final String TAG = AbcCoreJsUiModule.class.getSimpleName();
    private static final String ABC_CORE_JS_UI_MODULE = "AbcCoreJsUi";
    private static final String SAMPLE_ALIAS = "MYALIAS";
    private KeyStore mKeyStore;
    private KeyGenerator mKeyGenerator;
    private SharedPreferences mSharedPreferences;
    private Context AppContext;
    private Activity activityContext;
    private KeyguardManager keyguardManager;
    private FingerprintManagerCompat fingerprintManager;
    private Cipher defaultCipher;
    private Cipher cipherNotInvalidated;
    private Callback errorCallback;
    private Callback successCallback;
    private KeyStoreEncrypt encryptor;
    private KeyStoreDecrypt decryptor;
    private JSONObject jsonObject;
    private Activity mActivity = null;
    private SharedPreferencesStorage mStorage;
    private boolean mHasSecureElement = false;
    private Whorlwind mWhorlwind;


    public AbcCoreJsUiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.AppContext = reactContext;

        encryptor = new KeyStoreEncrypt();

        try {
            decryptor = new KeyStoreDecrypt();
        } catch (CertificateException | NoSuchAlgorithmException | KeyStoreException |
                IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getName() {
        return ABC_CORE_JS_UI_MODULE;
    }

    private boolean isFingerprintAvailable() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return ActivityCompat.checkSelfPermission(AppContext, Manifest.permission.USE_FINGERPRINT) == PackageManager.PERMISSION_GRANTED &&
                    AppContext.getSystemService(FingerprintManager.class).isHardwareDetected();
        } else {
            return FingerprintManagerCompat.from(AppContext).isHardwareDetected();
        }
    }

    private boolean checkHardwareSupport() {
        if (mStorage == null || mActivity == null || mWhorlwind == null) {
            mStorage = new SharedPreferencesStorage(getReactApplicationContext(), "co.airbitz.airbitz.storage");
            mActivity = getCurrentActivity();
            mWhorlwind = Whorlwind.create(mActivity, mStorage, "AirbitzKeyStore");
            if (mWhorlwind != null && mWhorlwind.canStoreSecurely()) {
                if(isFingerprintAvailable() && !RootChecker.isDeviceRooted()) {
                    mHasSecureElement = true;
                }
            }
            return mHasSecureElement;
        } else {
            return mHasSecureElement;
        }
    }

    @ReactMethod
    public void supportsTouchId(Promise promise) {
        promise.resolve(checkHardwareSupport());
    }
}
