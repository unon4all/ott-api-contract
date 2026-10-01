package com.trinova.sahara.core.network

import com.trinova.sahara.core.model.AppError
import java.io.File
import java.time.Instant
import kotlinx.serialization.Serializable
import org.junit.Assert.assertEquals
import org.junit.Test

@Serializable
private data class CompatibilityProbe(val id: String, val occurredAt: String, val state: String)

class B04SharedContractTest {
    private val contract = File(System.getenv("OTT_CONTRACT_DIR") ?: error("Missing contract checkout"))

    @Test
    fun sharedProblemFixturesDecodeThroughProductionSerializerAndFallback() {
        val validation = NetworkClientFactory.json.decodeFromString(
            BackendProblem.serializer(),
            contract.resolve("fixtures/errors/validation-error.json").readText()
        )
        assertEquals("VALIDATION_ERROR", validation.code)
        assertEquals(
            AppError.Validation(),
            DefaultErrorConverter().convert(TransportFailure.Http(400, validation))
        )

        val future = NetworkClientFactory.json.decodeFromString(
            BackendProblem.serializer(),
            contract.resolve("fixtures/errors/unknown-code.json").readText()
        )
        assertEquals(
            AppError.Internal("demo-request-04"),
            DefaultErrorConverter().convert(TransportFailure.Http(409, future))
        )
    }

    @Test
    fun sharedCompatibilityFixtureAcceptsUnknownFieldAndUtcInstant() {
        val probe = NetworkClientFactory.json.decodeFromString(
            CompatibilityProbe.serializer(),
            contract.resolve("fixtures/compatibility/transport-probe.json").readText()
        )
        assertEquals("cnt_demo_opaque", probe.id)
        assertEquals(Instant.parse("2026-09-20T12:00:00Z"), Instant.parse(probe.occurredAt))
        assertEquals("FUTURE_UNKNOWN_VALUE", probe.state)
    }
}
